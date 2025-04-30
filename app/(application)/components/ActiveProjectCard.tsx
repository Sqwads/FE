"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineArrowRight } from 'react-icons/hi';

interface Tag {
  name: string;
  color?: string;
}

interface ActiveProjectCardProps {
  id?: string; // Added id prop for navigation
  title: string;
  description: string;
  image: string;
  tags: string[];
  completionPercentage: number;
  daysRemaining: number;
}

const ActiveProjectCard: React.FC<ActiveProjectCardProps> = ({
  id = '1', // Default ID if not provided
  title,
  description,
  image,
  tags,
  completionPercentage,
  daysRemaining
}) => {
  // Map tag names to colors
  const getTagColor = (tag: string): string => {
    const tagMap: Record<string, string> = {
      'Python': 'bg-pink-100 text-pink-800',
      'Security': 'bg-blue-100 text-blue-800',
      'Education': 'bg-green-100 text-green-800',
      'React': 'bg-pink-100 text-pink-800',
      'API': 'bg-blue-100 text-blue-800',
      'CSS': 'bg-green-100 text-green-800',
      'Tableau': 'bg-pink-100 text-pink-800',
      'SQL': 'bg-blue-100 text-blue-800',
      'Data Visualization': 'bg-green-100 text-green-800',
    };
    
    return tagMap[tag] || 'bg-gray-100 text-gray-800';
  };

  // Determine progress bar color based on completion percentage
  const getProgressColor = (percentage: number): string => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Link href={`/dashboard/projects/${id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            {/* Project Image (Left Side) */}
            <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
              <div className="relative h-40 md:h-full bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src={image} 
                  alt={title}
                  width={200}
                  height={150}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
            {/* Project Details (Right Side) */}
            <div className="md:w-3/4">
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-600 mb-4">{description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Completion Level */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Completion Level</span>
                  <span className="text-sm font-medium">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${getProgressColor(completionPercentage)} h-2 rounded-full`} 
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Resume Work Link */}
              <div className="flex justify-between items-center">
                <Link href={`/dashboard/projects/${id}`} className="text-blue-600 font-medium flex items-center">
                  Resume work <HiOutlineArrowRight className="ml-1" />
                </Link>
                <span className="text-gray-500 text-sm">{daysRemaining} days to go</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActiveProjectCard;
