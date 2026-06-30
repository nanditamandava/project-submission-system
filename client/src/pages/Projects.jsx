import { useEffect, useState } from 'react';
import { getProjects } from '../api/projectApi';
import ProjectGrid from '../components/ProjectGrid';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        toast.error('Failed to fetch projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) return <Loader fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isAdmin ? 'Manage Projects' : 'My Projects'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {isAdmin 
              ? 'View and manage all projects in the system.' 
              : 'A list of projects assigned to you or available for submission.'}
          </p>
        </div>
      </div>

      <ProjectGrid projects={projects} />
    </div>
  );
}
