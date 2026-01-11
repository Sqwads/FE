"use client";

import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';
import SectionHeader from './SectionHeader';
import ActiveProjectCard from './ActiveProjectCard';

const ActiveProjectDisplaySection = ({ 
  title, 
  icon, 
  projects = [], 
  seeAllLink,
}: any) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <SectionHeader title={title} icon={icon} />
        {seeAllLink && (
          <Link href={seeAllLink} className="text-blue-600 text-sm font-medium inline-flex items-center hover:text-blue-700 transition-colors">
            See all <HiOutlineArrowRight className="ml-1" />
          </Link>
        )}
      </div>
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
          {projects.map((project: any) => {
            const dynamicLink = `/dashboard/projects/${project.id}`;
            console.log(`ActiveProjectDisplaySection: Mapping project ID: ${project.id}, Generated resumeLink: ${dynamicLink}`);
            return (
              <ActiveProjectCard 
                key={project.id} 
                {...project} 
                resumeLink={dynamicLink}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No active projects to display.</p>
      )}
    </div>
  );
};

export default ActiveProjectDisplaySection;