"use client";

import React, { useState } from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

// Define TypeScript interfaces for component props
interface AlertNotificationProps {
  message: string;
  daysLeft: number;
}

const AlertNotification: React.FC<AlertNotificationProps> = ({ message, daysLeft }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 relative">
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => setIsVisible(false)}
      >
        <FiX size={18} />
      </button>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <FiAlertTriangle className="text-orange-500" />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-sm sm:text-base">Upcoming Deadline Alert!</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Your project is due in <span className="font-medium">{daysLeft} days</span>. {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertNotification;

