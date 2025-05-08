"use client";

import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';
import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  duration: string;
  collaborators?: number;
  // Add any other project properties you need
}

interface ProjectDisplaySectionProps {
  title: string;
  icon: React.ReactNode;
  projects: Project[];
  seeAllLink?: string;
  emptyStateContent?: {
    title: string;
    description: string;
    actionText?: string;
    actionLink?: string;
    illustration?: React.ReactNode;
  };
  lgGridCols?: 2 | 3 | 4;
}

const ProjectDisplaySection = ({ 
  title, 
  icon, 
  projects = [], 
  seeAllLink,
  emptyStateContent,
  lgGridCols = 4
}: ProjectDisplaySectionProps) => {
  // Dynamically generate grid classes based on lgGridCols
  const gridClasses = `grid grid-cols-1 sm:grid-cols-2 gap-6 ${
    lgGridCols === 2 ? 'lg:grid-cols-2' : 
    lgGridCols === 3 ? 'lg:grid-cols-3' : 
    'lg:grid-cols-4'
  }`;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <SectionHeader title={title} icon={icon} />
        {seeAllLink && (
          <Link 
            href={seeAllLink} 
            className="text-blue-600 text-sm font-medium inline-flex items-center hover:text-blue-700 transition-colors"
          >
            See all <HiOutlineArrowRight className="ml-1" />
          </Link>
        )}
      </div>
      {projects.length > 0 ? (
        <div className={gridClasses}>
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      ) : (
        emptyStateContent && (
          <EmptyState 
            title={emptyStateContent.title}
            description={emptyStateContent.description}
            actionText={emptyStateContent.actionText}
            actionLink={emptyStateContent.actionLink}
            illustration={emptyStateContent.illustration}
          />
        )
      )}
    </div>
  );
};

export default ProjectDisplaySection;