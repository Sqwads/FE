'use client';

import { formatTextToSentenceCase } from '@/src/common';
import { customColors } from '@/src/common/data';
import React from 'react';

interface UserCategory {
  role: string;
  count: number;
  color: string;
}

interface UsersChartProps {
  users: any[];
  totalUsers: number;
  onEdit?: () => void;
}

const UsersChart: React.FC<UsersChartProps> = ({
  users,
  totalUsers,
  onEdit
}) => {


  const groupByRole = () => {
    return users?.reduce((acc:any, member:any) => {
      const role = member.role.trim(); // trim to clean leading/trailing spaces
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});
  }
 
  return (
    <div className="rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blue-900">USERS</h3>
        {/* <button 
          onClick={onEdit}
          className="text-[#001D69] text-sm hover:underline"
        >
          Edit Users
        </button> */}
      </div>
      
      <hr className="my-4 border-gray-100" />
      
      <div className="mt-2 flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-2 mb-4 md:mb-0">
          {Object.entries(groupByRole())?.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-3 h-3  rounded-full  mr-2`}   
              style={{background: customColors[index % customColors.length].deep}}></div>
              <span className="text-gray-700">{formatTextToSentenceCase(item[0])}</span>
              <span className="ml-auto pl-4 font-medium">{item[1] as string}</span>
            </div>
          ))}
        </div>
        
        {/* <div className="relative w-32 h-32">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-900">{totalUsers}</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UsersChart;
