
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  store: string;
  storeLink: string;
  password: string;
  joined: string;
}

const Members = () => {
  const [members] = useState<Member[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@store1.com',
      avatar: 'J',
      store: 'Downtown Store',
      storeLink: 'downtown-store',
      password: 'temp123',
      joined: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@store2.com',
      avatar: 'S',
      store: 'Mall Location',
      storeLink: 'mall-location',
      password: 'temp456',
      joined: '2024-01-20'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@store1.com',
      avatar: 'M',
      store: 'Downtown Store',
      storeLink: 'downtown-store',
      password: 'temp789',
      joined: '2024-02-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStore, setFilterStore] = useState('All Stores');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStore === 'All Stores' || member.store === filterStore;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Team Members</h1>
          <p className="text-gray-600">Manage your store team with ease</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Add New Member
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search members by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={filterStore} onValueChange={setFilterStore}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by store" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Stores">All Stores</SelectItem>
            <SelectItem value="Downtown Store">Downtown Store</SelectItem>
            <SelectItem value="Mall Location">Mall Location</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="relative">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-medium">
                  {member.avatar}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="text-blue-500 hover:text-blue-600">
                    ✏️
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                    ✕
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Store:</p>
                  <p className="text-sm text-blue-600 font-medium">{member.store}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Password:</p>
                  <p className="text-sm text-gray-600 font-mono">{member.password}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Joined:</p>
                  <p className="text-sm text-gray-600">{member.joined}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Members;
