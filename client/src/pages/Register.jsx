import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Register() {
  const { register: registerForm, handleSubmit, formState: { errors }, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role // Optional: normally role is set by admin, but we'll include it for demo purposes
      });
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
          <UserPlus className="h-8 w-8 text-primary-600" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Full Name"
              type="text"
              {...registerForm('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />

            <Input
              label="Email address"
              type="email"
              {...registerForm('email', { 
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' }
              })}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              {...registerForm('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
              error={errors.password?.message}
            />

            <Input
              label="Confirm Password"
              type="password"
              {...registerForm('confirmPassword', { 
                required: 'Please confirm your password',
                validate: val => {
                  if (watch('password') != val) {
                    return "Your passwords do not match";
                  }
                }
              })}
              error={errors.confirmPassword?.message}
            />

            {/* Optional Role selection for testing */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select 
                {...registerForm('role')}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
