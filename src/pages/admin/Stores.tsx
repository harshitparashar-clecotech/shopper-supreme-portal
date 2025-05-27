
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Store {
  id: string;
  name: string;
  storeId: string;
  members: number;
  icon: string;
}

const Stores = () => {
  const [stores] = useState<Store[]>([
    {
      id: '1',
      name: 'Downtown Store',
      storeId: 'DS001',
      members: 5,
      icon: '🏪'
    },
    {
      id: '2',
      name: 'Mall Location',
      storeId: 'ML002',
      members: 8,
      icon: '🏪'
    },
    {
      id: '3',
      name: 'Airport Branch',
      storeId: 'AB003',
      members: 3,
      icon: '🏪'
    },
    {
      id: '4',
      name: 'Suburban Center',
      storeId: 'SC004',
      members: 6,
      icon: '🏪'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.storeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Locations</h1>
          <p className="text-gray-600">Manage your retail network</p>
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white">
          Add New Store
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search stores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <Card key={store.id} className="relative">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white text-xl">
                  {store.icon}
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
                  <h3 className="font-semibold text-gray-900">{store.name}</h3>
                  <p className="text-sm text-gray-500">📍 ID: {store.storeId}</p>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">👥</span>
                    <span className="text-sm font-medium text-gray-700">Members</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">{store.members}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Stores;
