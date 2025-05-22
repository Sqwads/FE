"use client";

import React from 'react';

// Define TypeScript interfaces for component props
interface ProjectHeaderProps {
  title: string;
  type: string;
  duration: string;
  description: string;
  image?: string; // Image prop was present in user's code, keeping it
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ title, type, duration, description, image }) => {
  return (
    // Removed mb-6 from here, should be applied where the component is used if needed
    <div className="relative bg-white rounded-lg">
      <div className="flex flex-col">
        <div className="mb-4">
          <div className="text-xs font-medium text-blue-600 uppercase mb-7">
            {type} • {duration}
          </div>
          <h1 className="text-3xl text-[#16181B] mb-2">{title}</h1>
          <p className="text-gray-600 max-w-2xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;

