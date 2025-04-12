'use client';

import React from 'react';
import { FiUsers, FiClock, FiUserCheck, FiCalendar } from 'react-icons/fi';

interface KPICardProps {
  title: string;
  value: string | number;
  change: {
    value: number;
    isIncrease: boolean;
  };
  period: string;
  iconBgColor: string;
  icon: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  period,
  iconBgColor,
  icon
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm text-gray-600 font-medium">{title}</h3>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <div className="flex items-center mt-1">
            <span className={`text-xs ${change.isIncrease ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              {change.isIncrease ? (
                <span className="mr-1">↑</span>
              ) : (
                <span className="mr-1">↓</span>
              )}
              {Math.abs(change.value)}% {change.isIncrease ? 'Up' : 'Down'} from {period}
            </span>
          </div>
        </div>
        <div className={`${iconBgColor} p-2 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default KPICard;
