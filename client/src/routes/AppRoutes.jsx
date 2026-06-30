import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import ProjectDetails from '../pages/ProjectDetails';
import ProjectForm from '../pages/ProjectForm';
import Profile from '../pages/Profile';
import AdminDashboard from '../pages/AdminDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/projects" element={<Projects />} />
            <Route path="/admin/create" element={<ProjectForm />} />
            <Route path="/admin/edit/:id" element={<ProjectForm />} />
            <Route path="/admin/submissions" element={<Projects />} /> {/* Placeholder for submissions manager */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
