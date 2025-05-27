
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: '📊'
    },
    {
      path: '/admin/stores',
      label: 'Stores',
      icon: '🏪'
    },
    {
      path: '/admin/members',
      label: 'Members',
      icon: '👥'
    },
    {
      path: '/admin/orders',
      label: 'Orders',
      icon: '📦'
    }
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive || location.pathname === item.path
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
