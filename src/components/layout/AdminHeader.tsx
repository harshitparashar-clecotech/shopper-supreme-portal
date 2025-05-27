
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const AdminHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex-1"></div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
          <Button 
            variant="ghost" 
            onClick={logout}
            className="text-sm"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
