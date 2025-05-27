
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing credentials",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    try {
      await login(email, password);
      console.log('Login successful, navigation will be handled by AppRoutes');
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleDemoLogin = async (type: 'admin' | 'store') => {
    const credentials = type === 'admin' 
      ? { email: 'admin@demo.com', password: 'password' }
      : { email: 'store@demo.com', password: 'password' };
    
    console.log('Demo login attempt:', type, credentials);
    
    try {
      await login(credentials.email, credentials.password);
      console.log('Demo login successful, navigation will be handled by AppRoutes');
      toast({
        title: "Demo login successful",
        description: `Logged in as ${type}`,
      });
    } catch (error) {
      console.error('Demo login error:', error);
      toast({
        title: "Demo login failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Welcome Section */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm bg-blue-100 text-blue-800">
              ⭐ Trusted by 1000+ stores
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Welcome to <br />
            <span className="text-blue-600">Store Manager</span>
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 mb-6 lg:mb-8">
            Streamline your store operations with our powerful management platform. 
            Track orders, manage inventory, and grow your business effortlessly.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div className="text-center lg:text-left">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-3">
                📧
              </div>
              <h3 className="font-semibold mb-2">Order Management</h3>
              <p className="text-sm text-gray-600">Track and process orders efficiently</p>
            </div>
            
            <div className="text-center lg:text-left">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-3">
                👥
              </div>
              <h3 className="font-semibold mb-2">Team Collaboration</h3>
              <p className="text-sm text-gray-600">Work seamlessly with your team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:max-w-md flex flex-col justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm mx-auto">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Sign In</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Access your dashboard and manage your store</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-lg sm:text-xl">Welcome Back</CardTitle>
              <p className="text-center text-xs sm:text-sm text-gray-600">Enter your credentials to continue</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <div className="text-center text-xs sm:text-sm text-gray-500 mb-3">DEMO ACCOUNTS</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleDemoLogin('admin')}
                    className="text-xs sm:text-sm h-10"
                    disabled={loading}
                  >
                    👨‍💼 Admin Demo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDemoLogin('store')}
                    className="text-xs sm:text-sm h-10"
                    disabled={loading}
                  >
                    🏪 Store Demo
                  </Button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  💡 Demo Password: password (for all demo accounts)
                </p>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
