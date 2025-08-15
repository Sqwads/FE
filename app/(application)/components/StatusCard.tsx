"use client";

import React from 'react';

interface StatusCardProps {
  title: string;
  count: number;
  description: string;
  bgColor: string;
  icon: React.ReactNode;
  iconBgColor?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, count, description, bgColor, icon, iconBgColor }) => {
  return (
    <div className={`${bgColor} rounded-xl p-5 text-white relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-full h-full opacity-10">
        {/* Geometric pattern overlay */}
        <div className="w-40 h-40 rounded-full bg-white opacity-10 absolute -top-20 -right-20"></div>
        <div className="w-20 h-20 rounded-full bg-white opacity-10 absolute top-10 right-10"></div>
      </div>
      <div className="relative z-10">
        <div className="mb-5 h-10 w-10 flex items-center justify-center rounded-full" style={{ backgroundColor: iconBgColor || 'transparent' }}>
          {icon}
        </div>
        <div className="uppercase text-lg   mb-5">{title}</div>
       <div className="flex">
        <div className="text-4xl  mb-2 mr-14">{count}</div>
        <div className="text-sm opacity-90 flex-1">{description}</div>
       </div>
      </div>
    </div>
  );
};

export default StatusCard;
