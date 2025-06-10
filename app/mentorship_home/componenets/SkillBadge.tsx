"use client";

import React from 'react';

// Define TypeScript interfaces for component props
interface SkillBadgeProps {
  name: string;
  icon: React.ReactNode | string; // Keep flexibility as in user's code
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, icon }) => {
  // Basic skill badge rendering from user's code
  return (
    <div className="flex flex-col items-center mr-4 mb-2 sm:mr-6 sm:mb-0">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-1 sm:mb-2">
        {/* Render icon - assuming simple text or potentially an icon component */}
        {typeof icon === 'string' ? (
          <span className="text-lg sm:text-xl font-bold text-gray-600">{icon}</span> 
        ) : (
          icon 
        )}
      </div>
      <span className="text-xs sm:text-sm text-center">{name}</span>
    </div>
  );
};

export default SkillBadge;

