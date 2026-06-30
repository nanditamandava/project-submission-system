import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createProject, updateProject, getProjectById } from '../api/projectApi';
import Input from '../components/Input';
import Button from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

export default function ProjectForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchProject = async () => {
        try {
          const project = await getProjectById(id);
          // Format date for input field
          if (project.deadline) {
            project.deadline = new Date(project.deadline).toISOString().split('T')[0];
          }
          reset(project);
        } catch (error) {
          toast.error('Failed to load project details');
          navigate('/admin/projects');
        } finally {
          setIsLoading(false);
        }
      };
      fetchProject();
    }
  }, [id, isEditMode, reset, navigate]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateProject(id, data);
        toast.success('Project updated successfully');
      } else {
        await createProject(data);
        toast.success('Project created successfully');
      }
      navigate('/admin/projects');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loader fullScreen />;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Edit Project' : 'Create New Project'}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Project Title"
              {...register('title', { required: 'Title is required' })}
              error={errors.title?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={5}
                className={`block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
                  errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                }`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <Input
              label="Deadline"
              type="date"
              {...register('deadline', { required: 'Deadline is required' })}
              error={errors.deadline?.message}
            />

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="ghost" onClick={() => navigate('/admin/projects')}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isSubmitting}>
                {isEditMode ? 'Update Project' : 'Create Project'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
