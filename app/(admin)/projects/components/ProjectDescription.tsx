'use client';

import React from 'react';

interface ProjectDescriptionProps {
  overview: string;
  features: {
    title: string;
    description: string;
  }[];
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  overview,
  features
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Description</h2>
      
      <div className="mt-4">
        <h3 className="font-medium text-gray-700">Project Overview</h3>
        <p className="text-gray-600 mt-2 leading-relaxed">{overview}</p>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium text-gray-700">Key Features and Design Goals</h3>
        <ul className="mt-4 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex">
              <span className="text-blue-600 mr-2">•</span>
              <div>
                <span className="font-medium">{feature.title}: </span>
                <span className="text-gray-600">{feature.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDescription;
