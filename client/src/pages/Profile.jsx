import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { User, Mail, Shield } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

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
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-900">{user?.name}</h2>
              <p className="text-sm text-gray-500 capitalize">{user?.role} Account</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> Email Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Shield className="h-4 w-4 mr-2" /> Role Level
                </dt>
                <dd className="mt-1 text-sm text-gray-900 capitalize">{user?.role}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
