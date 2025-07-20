import React from 'react';

interface DashboardMetricCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  iconBgColor: string;
  iconColor: string;
}

const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({
  icon,
  value,
  label,
  iconBgColor,
  iconColor
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        {/* Icon Container */}
        <div 
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBgColor}`}
        >
          <div className={`w-6 h-6 ${iconColor}`}>
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          <div className="text-sm text-gray-600 font-medium">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetricCard;

