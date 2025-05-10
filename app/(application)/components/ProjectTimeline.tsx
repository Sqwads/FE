"use client";

import React from 'react';

// Define TypeScript interfaces for component props
interface ProjectTimelineProps {
  startDay: number;
  endDay: number;
  // Consider adding progress as a prop if it's dynamic
  progressPercentage?: number; 
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ 
  startDay, 
  endDay, 
  progressPercentage = 40 // Default progress from user's code
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-medium text-sm sm:text-base">Start</h3>
          <p className="text-xs sm:text-sm text-gray-500">Day {startDay}</p>
        </div>
        <div className="text-right">
          <h3 className="font-medium text-sm sm:text-base">End</h3>
          <p className="text-xs sm:text-sm text-gray-500">Day {endDay}</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-width duration-500 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProjectTimeline;

