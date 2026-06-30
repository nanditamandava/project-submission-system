import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none lg:hidden mr-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to={isAdmin ? "/admin" : "/dashboard"} className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600 tracking-tight">MERN Project</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline-block">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
