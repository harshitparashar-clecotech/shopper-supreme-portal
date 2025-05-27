
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Heart, Search, Menu, User, LogOut } from 'lucide-react';

const Index = () => {
  const { user, logout } = useAuth();

  const categories = [
    { id: 1, name: 'Electronics', icon: '📱', count: 156 },
    { id: 2, name: 'Clothing', icon: '👕', count: 234 },
    { id: 3, name: 'Home & Garden', icon: '🏠', count: 89 },
    { id: 4, name: 'Books', icon: '📚', count: 167 },
    { id: 5, name: 'Sports', icon: '⚽', count: 78 },
    { id: 6, name: 'Beauty', icon: '💄', count: 123 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Store Manager</h1>
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </Button>
              
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Welcome, {user?.name}</span>
              </div>
              
              <Button onClick={logout} variant="outline" size="sm" className="hidden sm:flex">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button onClick={logout} variant="ghost" size="icon" className="sm:hidden">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
                <p className="text-blue-100">Discover amazing products and exclusive deals</p>
              </div>
              <div className="hidden sm:block text-6xl opacity-20">
                🛒
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Shop by Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h4 className="font-medium text-sm sm:text-base mb-1">{category.name}</h4>
                  <p className="text-xs text-gray-500">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Featured Products</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200 rounded-t-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-gray-500 text-4xl">📦</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Sample Product {i}</h4>
                  <p className="text-sm text-gray-600 mb-3">Brief product description that highlights key features</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">$99.99</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Coming Soon Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🚀</span>
              <span>Coming Soon</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 border rounded-lg">
                <div className="text-2xl mb-2">🔄</div>
                <h4 className="font-medium mb-1">Infinite Scroll</h4>
                <p className="text-sm text-gray-600">Seamless product browsing</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl mb-2">🛒</div>
                <h4 className="font-medium mb-1">Advanced Cart</h4>
                <p className="text-sm text-gray-600">Enhanced shopping experience</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl mb-2">❤️</div>
                <h4 className="font-medium mb-1">Smart Wishlist</h4>
                <p className="text-sm text-gray-600">Save and organize favorites</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-medium mb-1">Personalization</h4>
                <p className="text-sm text-gray-600">Tailored recommendations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
