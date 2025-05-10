"use client";

import React from 'react';

interface StatusCardProps {
  title: string;
  count: number;
  description: string;
  bgColor: string;
  icon: React.ReactNode;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, count, description, bgColor, icon }) => {
  return (
    <div className={`${bgColor} rounded-lg p-5 text-white relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-full h-full opacity-10">
        {/* Geometric pattern overlay */}
        <div className="w-40 h-40 rounded-full bg-white opacity-10 absolute -top-20 -right-20"></div>
        <div className="w-20 h-20 rounded-full bg-white opacity-10 absolute top-10 right-10"></div>
      </div>
      <div className="relative z-10">
        <div className="mb-2">
          {icon}
        </div>
        <div className="uppercase text-xs font-medium tracking-wider mb-1">{title}</div>
        <div className="text-4xl font-bold mb-2">{count}</div>
        <div className="text-sm opacity-90">{description}</div>
      </div>
    </div>
  );
};

export default StatusCard;
