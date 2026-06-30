import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './Card';
import { cn } from '../utils/cn';

export default function ProjectCard({ project }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formattedDate = new Date(project.deadline || Date.now()).toLocaleDateString();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {formattedDate}
          </div>
          <div className="flex items-center">
            <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium capitalize', getStatusColor(project.status))}>
              {project.status || 'Active'}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link 
          to={`/projects/${project._id}`} 
          className="w-full flex items-center justify-center space-x-2 text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 py-2 rounded-md transition-colors"
        >
          <span>View Details</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
