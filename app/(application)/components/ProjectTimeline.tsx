"use client";

import React from 'react';

// Define TypeScript interfaces for component props
interface ProjectTimelineProps {
  currentDay: number;
  endDay: number;
  progressPercentage?: number; 
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ 
  currentDay, 
  endDay, 
  progressPercentage = 40
}) => {

   const progressWidth = (Number(currentDay) / Number(endDay)) * 100
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-medium text-sm sm:text-base">Start</h3>
          <p className="text-xs sm:text-sm text-gray-500">Day {0}</p>
        </div>
        <div className="text-right">
          <h3 className="font-medium text-sm sm:text-base">End</h3>
          <p className="text-xs sm:text-sm text-gray-500">Day {endDay}</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 h-2  overflow-hidden">
        <div 
          className="bg-blue-800 opacity-50 h-2  transition-width duration-500 ease-in-out" 
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProjectTimeline;

