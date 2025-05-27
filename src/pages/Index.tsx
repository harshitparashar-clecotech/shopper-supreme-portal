
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Store Manager</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </header>

        {/* User Dashboard Coming Soon */}
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🏪</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">User Dashboard</h2>
            <p className="text-lg text-gray-600 mb-8">
              Your personalized shopping experience is coming soon! We're building an amazing 
              user interface with categories, products, cart, and wishlist features.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>🗂️</span>
                <span>Category Navigation</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📱</span>
                <span>Product Browsing</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🛒</span>
                <span>Shopping Cart</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>❤️</span>
                <span>Wishlist</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
