import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById, uploadProjectPdf, deleteProjectPdf } from '../api/projectApi';
import { getSubmissionsByProject, createSubmission } from '../api/submissionApi';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import UploadCard from '../components/UploadCard';
import toast from 'react-hot-toast';
import { Calendar, Clock, FileText, CheckCircle, Download, Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';

export default function ProjectDetails() {
  const { id } = useParams();
  
  const getFileUrl = (filePath) => {
    if (!filePath) return '#';
    const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:8000';
    const formattedPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
    return `${baseUrl}${formattedPath}`;
  };
  const { isAdmin } = useAuth();
  const [project, setProject] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [lastUpload, setLastUpload] = useState(null);

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
      formData.append('zip', file);
      formData.append('projectId', id);

      const newSubmission = await createSubmission(formData);
      setSubmissions([...submissions, newSubmission]);
      setLastUpload({ name: file.name, time: new Date() });
      toast.success('Submission uploaded successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload submission');
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleAdminPdfUpload = async (file) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const updatedProject = await uploadProjectPdf(id, formData);
      setProject(updatedProject);
      setLastUpload({ name: file.name, time: new Date() });
      toast.success('Project PDF uploaded successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload PDF');
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePdf = async () => {
    if (!window.confirm('Are you sure you want to delete the project documentation?')) {
      return;
    }
    
    try {
      const updatedProject = await deleteProjectPdf(id);
      setProject(updatedProject);
      toast.success('Documentation deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete documentation');
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
                        <a 
                          href={getFileUrl(sub.zipFile)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline truncate max-w-xs flex items-center"
                        >
                          {sub.zipFile ? sub.zipFile.split('/').pop() : `Submission ${idx + 1}`}
                          <Download className="ml-2 h-4 w-4" />
                        </a>
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
          {/* Documentation File Section */}
          {project.documentationPDF && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  <a 
                    href={getFileUrl(project.documentationPDF)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center flex-1 min-w-0"
                  >
                    <FileText className="h-6 w-6 text-red-500 mr-3" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {project.documentationPDF.split('/').pop()}
                      </p>
                      <p className="text-xs text-gray-500">Click to view/download</p>
                    </div>
                  </a>
                  <div className="flex items-center space-x-2 ml-4">
                    <a 
                      href={getFileUrl(project.documentationPDF)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                    {isAdmin && (
                      <button 
                        onClick={handleDeletePdf}
                        className="text-red-400 hover:text-red-600 focus:outline-none"
                        title="Delete Documentation"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Section (Only for users or admin if allowed) */}
          <div className="space-y-4">
            {lastUpload && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-green-800 flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-green-900">{lastUpload.name}</p>
                  <p className="text-xs text-green-700 mt-1">Uploaded successfully</p>
                  <p className="text-xs text-green-700 font-medium mt-0.5">
                    {lastUpload.time.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            )}
            
            {!isAdmin ? (
              <UploadCard
                title="Submit Project"
                description="Upload your project files (PDF or ZIP)."
                accept=".pdf,.zip"
                onUpload={handleUpload}
                isUploading={isUploading}
                buttonText={submissions.length > 0 || lastUpload ? "Submit Updated Version" : "Upload File"}
              />
            ) : (
              <UploadCard
                title="Project Documentation"
                description="Upload project documentation (PDF only)."
                accept=".pdf"
                onUpload={handleAdminPdfUpload}
                isUploading={isUploading}
                buttonText={project.documentationPDF || lastUpload ? "Upload Updated Version" : "Upload File"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
