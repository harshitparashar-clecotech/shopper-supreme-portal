
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface DashboardStats {
  approvedOrders: number;
  totalStores: number;
  totalMembers: number;
  pendingOrders: number;
}

interface RecentOrder {
  id: string;
  member: string;
  store: string;
  amount: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface StorePerformance {
  name: string;
  id: string;
  members: number;
}

const Dashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    approvedOrders: 1,
    totalStores: 4,
    totalMembers: 3,
    pendingOrders: 1
  });
  
  const [recentOrders] = useState<RecentOrder[]>([
    {
      id: '#rder-1',
      member: 'John Smith',
      store: 'Downtown Store',
      amount: '$179.98',
      status: 'pending'
    },
    {
      id: '#rder-2',
      member: 'Sarah Johnson',
      store: 'Mall Location',
      amount: '$199.99',
      status: 'approved'
    }
  ]);

  const [storePerformance] = useState<StorePerformance[]>([
    { name: 'Downtown Store', id: 'DS001', members: 5 },
    { name: 'Mall Location', id: 'ML002', members: 8 }
  ]);

  const handleRefresh = () => {
    console.log('Refreshing dashboard data...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">📊</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business</p>
          </div>
        </div>
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.approvedOrders}</p>
                <p className="text-sm text-gray-500">Completed orders</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">✓</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <span className="text-sm text-green-600 mt-1 inline-block">+18%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stores</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalStores}</p>
                <p className="text-sm text-gray-500">Active locations</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">🏪</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <span className="text-sm text-blue-600 mt-1 inline-block">+12%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalMembers}</p>
                <p className="text-sm text-gray-500">Registered users</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 text-xl">👥</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-sm text-gray-600 mt-1 inline-block">+18%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
                <p className="text-sm text-gray-500">Awaiting approval</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 text-xl">⏰</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="text-sm text-red-600 mt-1 inline-block">-5%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Store Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600">📦</span>
              </div>
              <div>
                <CardTitle className="text-lg">Recent Orders</CardTitle>
                <p className="text-sm text-gray-600">Latest transactions from your stores</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {order.member.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.member}</p>
                      <p className="text-sm text-gray-500">{order.store}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">🏪</span>
              </div>
              <div>
                <CardTitle className="text-lg">Store Performance</CardTitle>
                <p className="text-sm text-gray-600">Member distribution</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storePerformance.map((store) => (
                <div key={store.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-medium">
                      {store.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{store.name}</p>
                      <p className="text-sm text-gray-500">ID: {store.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{store.members}</p>
                    <p className="text-sm text-gray-500">members</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
