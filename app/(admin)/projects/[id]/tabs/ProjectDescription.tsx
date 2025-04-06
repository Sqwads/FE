'use client';

import React from 'react';

interface ProjectDescriptionProps {
  overview: string;
  currentDay: string | number;
  endDay: string | number;
  
  features:string ;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  overview,
  features,
  endDay,
  currentDay,
  
}) => {

  const progressWidth = (Number(currentDay) / Number(endDay)) * 100
  return (
    <div className="mt-6">
      {/* Timeline Progress (visible on left panel) */}
      <div className="mb-6">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-[#001D69] text-lg">Start</h2>
            <p className="text-[#16181B80]">Day 0</p>
          </div>
          <div className="text-right">
            <h2 className="font-bold text-[#16181B] text-lg">End</h2>
            <p className="text-[#16181B80]">Day {endDay}</p>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
          <div className=" h-full bg-blue-500 rounded-full" style={{width: `${progressWidth> 100? 100: progressWidth}%`}}></div>
        </div>
      </div>
      <h2 className="text-xl font-semibold">Description</h2>
      
      <div className="mt-4">
        <h3 className="font-medium text-gray-700">Project Overview</h3>
        <p className="text-gray-600 mt-2 leading-relaxed">{overview}</p>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium text-gray-700">Key Features and Design Goals</h3>
        <p className="text-gray-600 mt-2 leading-relaxed">{features}</p>
      </div>

      
    </div>
  );
};

export default ProjectDescription;
