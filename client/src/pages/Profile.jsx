import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { User, Mail, Shield, Calendar, Edit2, Check, X } from 'lucide-react';
import { getProfile, updateProfile } from '../api/authApi';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfileData(res.data);
        setEditName(res.data.name);
      } catch (error) {
        toast.error('Failed to load profile details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!editName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    setIsSaving(true);
    try {
      const res = await updateProfile({ name: editName });
      setProfileData(res.data);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <Loader fullScreen />;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
                <User className="h-8 w-8" />
              </div>
              <div>
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="text" 
                      value={editName} 
                      onChange={(e) => setEditName(e.target.value)}
                      className="mb-0"
                    />
                    <Button size="sm" onClick={handleSave} isLoading={isSaving} className="p-2">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => { setIsEditing(false); setEditName(profileData?.name); }} disabled={isSaving} className="p-2">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-medium text-gray-900">{profileData?.name}</h2>
                    <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-primary-600 transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
                <p className="text-sm text-gray-500 capitalize">{profileData?.role} Account</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> Email Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{profileData?.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Shield className="h-4 w-4 mr-2" /> Role Level
                </dt>
                <dd className="mt-1 text-sm text-gray-900 capitalize">{profileData?.role}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" /> Account Created
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : 'N/A'}
                </dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
