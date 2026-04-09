"use client";
import React from 'react';
import Image from 'next/image'; 

interface StatCardProps {
  title: string;
  value: string | number;
  valueColor: string;
  iconSrc?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  valueColor,
  iconSrc 
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex items-center">
      {iconSrc && (
        <div className="mr-4">
          <Image 
            src={iconSrc} 
            alt={title} 
            width={48} 
            height={48} 
          />
        </div>
      )}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-2xl font-semibold ${valueColor}`}>{value}</p>
      </div>
    </div>
  );
};


const ProjectsSection: React.FC = () => {
  return (
    <div>
      {/* Projects Heading */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Projects</h1>
        <p className="text-sm text-gray-500">Manage your assigned projects and explore new ones.</p>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard 
          title="Project Assigned" 
          value="25" 
          valueColor="text-indigo-600"
          iconSrc="/images/folder.png" 
        />
        <StatCard 
          title="Overall Project Progress" 
          value="73%" 
          valueColor="text-green-500"
          iconSrc="/images/completed_1.png" 
        />
        <StatCard 
          title="Task Completion Rate" 
          value="456" 
          valueColor="text-blue-500"
          iconSrc="/images/rate.png" 
        />
      </div>
    </div>
  );
};

export default ProjectsSection;
