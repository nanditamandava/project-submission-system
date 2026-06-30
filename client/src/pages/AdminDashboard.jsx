import { useEffect, useState } from 'react';
import { getProjects } from '../api/projectApi';
import { getUsers } from '../api/authApi';
import { getAllSubmissions } from '../api/submissionApi';
import ProjectGrid from '../components/ProjectGrid';
import Loader from '../components/Loader';
import { Users, Folder, UploadCloud, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [projectsData, usersData, submissionsData] = await Promise.all([
          getProjects(),
          getUsers().catch(() => []),
          getAllSubmissions().catch(() => [])
        ]);
        
        setProjects(projectsData);
        setTotalUsers(usersData.length);
        setTotalSubmissions(submissionsData.length);
      } catch (error) {
        toast.error('Failed to load admin dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (isLoading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
        <Link 
          to="/admin/create" 
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Create Project
        </Link>
      </div>

      {/* Admin Stats row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
              <Folder className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Projects</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{projects.length}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{totalUsers}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
              <UploadCloud className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Submissions</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{totalSubmissions}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Manage Projects</h2>
        </div>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
