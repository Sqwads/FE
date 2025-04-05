'use client';

import React from 'react';

interface UserCategory {
  role: string;
  count: number;
  color: string;
}

interface UsersChartProps {
  users: UserCategory[];
  totalUsers: number;
  onEdit?: () => void;
}

const UsersChart: React.FC<UsersChartProps> = ({
  users,
  totalUsers,
  onEdit
}) => {
  // Function to determine color based on role
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Product Design':
        return 'bg-[#38428D]';
      case 'Front-end dev':
        return 'bg-[#36BFFA]';
      case 'Back-end dev':
        return 'bg-[#F53225]';
      case 'Product Mgt':
        return 'bg-[#EE46BC]';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blue-900">USERS</h3>
        <button 
          onClick={onEdit}
          className="text-[#001D69] text-sm hover:underline"
        >
          Edit Users
        </button>
      </div>
      
      <hr className="my-4 border-gray-100" />
      
      <div className="mt-2 flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-2 mb-4 md:mb-0">
          {users.map((user, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-3 h-3  rounded-full ${getRoleColor(user.role)} mr-2`}></div>
              <span className="text-gray-700">{user.role}</span>
              <span className="ml-auto pl-4 font-medium">{user.count}</span>
            </div>
          ))}
        </div>
        
        <div className="relative w-32 h-32">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-900">{totalUsers}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersChart;
