
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Check, X } from 'lucide-react';

interface Order {
  id: string;
  member: string;
  memberAvatar: string;
  store: string;
  items: string;
  itemsDetail: string;
  total: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

const Orders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '#rder-1',
      member: 'John Smith',
      memberAvatar: 'J',
      store: 'Downtown Store',
      items: '1 items',
      itemsDetail: 'Product 1',
      total: '$56.00',
      status: 'pending',
      date: 'May 19, 2025'
    },
    {
      id: '#rder-2',
      member: 'Sarah Johnson',
      memberAvatar: 'S',
      store: 'Mall Location',
      items: '1 items',
      itemsDetail: 'Product 2',
      total: '$318.00',
      status: 'approved',
      date: 'May 15, 2025'
    },
    {
      id: '#rder-3',
      member: 'Mike Wilson',
      memberAvatar: 'M',
      store: 'Airport Branch',
      items: '1 items',
      itemsDetail: 'Product 3',
      total: '$80.00',
      status: 'rejected',
      date: 'May 3, 2025'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Orders');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'approved' as const } : order
    ));
  };

  const handleReject = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'rejected' as const } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.store.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All Orders' || order.status === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Review and manage customer orders</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">🔍</span>
              <span className="text-sm font-medium">Search & Filter</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1">
              <Input
                placeholder="Search by order number, member, or store..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Orders">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          <p className="text-sm text-gray-600">Showing 1-{filteredOrders.length} of {filteredOrders.length} orders</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Order #</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Member</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Store</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Items</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-mono text-sm">{order.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {order.memberAvatar}
                        </div>
                        <span className="font-medium">{order.member}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{order.store}</td>
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-medium">{order.items}</span>
                        <br />
                        <span className="text-sm text-gray-500">{order.itemsDetail}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium">{order.total}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{order.date}</td>
                    <td className="py-4 px-4">
                      {order.status === 'pending' ? (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleApprove(order.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(order.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
