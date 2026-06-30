import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Folder, Users, Settings, X, UploadCloud } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Sidebar({ isOpen, onClose }) {
  const { isAdmin } = useAuth();

  const navItems = isAdmin 
    ? [
        { name: 'Dashboard', to: '/admin', icon: LayoutDashboard },
        { name: 'Projects', to: '/admin/projects', icon: Folder },
        { name: 'Submissions', to: '/admin/submissions', icon: UploadCloud },
      ]
    : [
        { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
        { name: 'My Projects', to: '/projects', icon: Folder },
        { name: 'Profile', to: '/profile', icon: Settings },
      ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-4 lg:hidden border-b border-gray-200">
          <span className="text-xl font-bold text-primary-600 tracking-tight">Menu</span>
          <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 p-2 rounded-md">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.to === '/admin' || item.to === '/dashboard'}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) =>
                cn(
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-2 py-2.5 text-sm font-medium rounded-md transition-colors'
                )
              }
            >
              <item.icon
                className={cn(
                  'mr-3 flex-shrink-0 h-5 w-5',
                  'text-gray-400 group-hover:text-gray-500'
                )}
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
