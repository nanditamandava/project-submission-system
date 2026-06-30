import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../api/projectApi';
import { getSubmissionsByProject, createSubmission } from '../api/submissionApi';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import UploadCard from '../components/UploadCard';
import toast from 'react-hot-toast';
import { Calendar, Clock, FileText } from 'lucide-react';
import { cn } from '../utils/cn';

export default function ProjectDetails() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const [project, setProject] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const [projectData, submissionsData] = await Promise.all([
          getProjectById(id),
          getSubmissionsByProject(id).catch(() => []) // if it fails, fallback to empty
        ]);
        setProject(projectData);
        setSubmissions(submissionsData);
      } catch (error) {
        toast.error('Failed to load project details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleUpload = async (file) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', id);
      
      const newSubmission = await createSubmission(formData);
      setSubmissions([...submissions, newSubmission]);
      toast.success('Submission uploaded successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload submission');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) return <Loader fullScreen />;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
        <span className={cn(
          'px-3 py-1 rounded-full text-sm font-medium capitalize',
          project.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        )}>
          {project.status || 'Active'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
              
              <div className="mt-6 flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                  Due: {new Date(project.deadline || Date.now()).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submissions List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {submissions.length === 0 ? (
                <p className="text-sm text-gray-500">No submissions yet.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {submissions.map((sub, idx) => (
                    <li key={idx} className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary-500 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          {sub.fileName || `Submission ${idx + 1}`}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(sub.createdAt || Date.now()).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* Upload Section (Only for users or admin if allowed) */}
          {!isAdmin && (
            <UploadCard 
              title="Submit Project"
              description="Upload your project files (PDF or ZIP)."
              accept=".pdf,.zip"
              onUpload={handleUpload}
              isUploading={isUploading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
