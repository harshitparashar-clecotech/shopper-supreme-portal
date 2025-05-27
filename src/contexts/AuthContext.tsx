
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
  store_id?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider useEffect - checking stored user');
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined' && token) {
        const parsedUser = JSON.parse(storedUser);
        console.log('Found stored user:', parsedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
      // Clear invalid data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setToken(null);
    }
    setLoading(false);
  }, [token]);

  const login = async (email: string, password: string) => {
    console.log('Login attempt for:', email);
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login failed with status:', response.status, 'Response:', errorText);
        throw new Error(`Login failed: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      if (!responseText || responseText === 'undefined') {
        throw new Error('Server returned invalid response');
      }

      const data = JSON.parse(responseText);
      console.log('Login successful, user data:', data.user);
      
      if (!data.user || !data.token) {
        throw new Error('Invalid response format');
      }
      
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Login error:', error);
      // For demo purposes, if API is not available, use mock login
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.log('API not available, using mock login');
        const mockUser = {
          id: 1,
          email: email,
          name: email === 'admin@demo.com' ? 'Admin User' : 'Demo User',
          role: email === 'admin@demo.com' ? 'admin' as const : 'user' as const,
          store_id: email === 'admin@demo.com' ? undefined : 1
        };
        const mockToken = 'mock-token-' + Date.now();
        
        setUser(mockUser);
        setToken(mockToken);
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return;
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    console.log('Register attempt for:', email);
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, role: 'user' }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Registration failed with status:', response.status, 'Response:', errorText);
        throw new Error(`Registration failed: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      if (!responseText || responseText === 'undefined') {
        throw new Error('Server returned invalid response');
      }

      const data = JSON.parse(responseText);
      console.log('Registration successful, user data:', data.user);
      
      if (!data.user || !data.token) {
        throw new Error('Invalid response format');
      }
      
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Registration error:', error);
      // For demo purposes, if API is not available, use mock registration
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.log('API not available, using mock registration');
        const mockUser = {
          id: Date.now(),
          email: email,
          name: name,
          role: 'user' as const,
          store_id: 1
        };
        const mockToken = 'mock-token-' + Date.now();
        
        setUser(mockUser);
        setToken(mockToken);
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return;
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
