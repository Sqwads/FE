'use client';

import React from 'react';

interface ProjectHeaderProps {
  title: string;
  subtitle: string;
  projectType: string;
  duration: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  subtitle,
  projectType,
  duration
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-4">
      <div>
        <div className="text-xs uppercase text-gray-500 mb-1">
          {projectType} • {duration}
        </div>
      <h1 className="text-3xl text-[#16181B] mb-2">{title}</h1>
        <p className="text-[#16181B80]">{subtitle}</p>
      </div>
    </div>
  );
};

export default ProjectHeader;
