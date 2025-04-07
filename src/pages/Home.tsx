
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, Users, ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to User Management System</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          A system where users can register, login, view their profile, and administrators can manage user accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Registration
            </CardTitle>
            <CardDescription>Create a new account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Sign up to access your personalized profile and features.</p>
            {!isAuthenticated && (
              <Link to="/register">
                <Button>Register Now</Button>
              </Link>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Profile
            </CardTitle>
            <CardDescription>View and manage your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Access your profile information and update your details.</p>
            {isAuthenticated ? (
              <Link to="/profile">
                <Button>View Profile</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button>Login to Access</Button>
              </Link>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Admin Dashboard
            </CardTitle>
            <CardDescription>Manage user accounts and system settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Administrators can manage users and system settings.</p>
            {isAuthenticated && user?.role === 'admin' ? (
              <Link to="/admin">
                <Button>Admin Dashboard</Button>
              </Link>
            ) : (
              <p className="text-sm text-gray-500">
                {isAuthenticated 
                  ? "You don't have admin access."
                  : "Login as an admin to access."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          {isAuthenticated 
            ? `Logged in as ${user?.username}. You can access your profile and features.`
            : "Not logged in. Please login or register to access all features."}
        </p>
        {!isAuthenticated && (
          <div className="flex justify-center gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
