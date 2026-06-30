import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProjects } from '../api/projectApi';
import ProjectGrid from '../components/ProjectGrid';
import Loader from '../components/Loader';
import { LayoutDashboard, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Normally we might have a specific dashboard endpoint, but we'll fetch all projects
        // and filter or just show them. For this demo, let's just get projects.
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) return <Loader fullScreen />;

  const activeProjects = projects.filter(p => p.status !== 'completed').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
              <LayoutDashboard className="h-6 w-6 text-primary-600" />
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
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{activeProjects}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Completed Projects</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{completedProjects}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Your Projects</h2>
        </div>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
