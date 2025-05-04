"use client";

import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { FiBookmark } from 'react-icons/fi';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  duration: string;
  collaborators: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  tags, 
  duration, 
  collaborators 
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="relative h-40 overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className={`text-xs px-2 py-1 rounded-full ${
                index % 3 === 0 ? 'bg-pink-100 text-pink-800' : 
                index % 3 === 1 ? 'bg-blue-100 text-blue-800' : 
                'bg-green-100 text-green-800'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex -space-x-2">
            {[...Array(Math.min(collaborators, 3))].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                {i + 1}
              </div>
            ))}
            {collaborators > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                +{collaborators - 3}
              </div>
            )}
          </div>
          <button className="text-gray-400 hover:text-blue-600">
            <FiBookmark />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <Link href="#" className="text-blue-600 text-sm font-medium inline-flex items-center">
            Learn more <HiOutlineArrowRight className="ml-1" />
          </Link>
          <span className="text-xs text-gray-500">{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
