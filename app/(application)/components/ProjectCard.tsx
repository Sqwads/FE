"use client";

import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { FiBookmark } from 'react-icons/fi';
import { trimSentence } from '@/common';

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  tags, 
  duration, 
  collaborators = [] 
}: any) => {

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="relative h-40 overflow-hidden">
        {/* Replaced Image with img */}
        <img 
          src={image} 
          alt={title} 
          className="w-full  h-32 w-64 h-full object-cover transition-transform hover:scale-105 duration-300"
          
        />
      </div>
      <div className="p-4">
        <div className="font-medium text-lg mb-1">{title}</div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{trimSentence(description || '')}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {tags?.map((tag: any, index: any) => (
            <span 
              key={index} 
              className={`text-xs px-2 py-1 rounded ${
                index % 3 === 0 ? 'bg-pink-100 border border-pink-400 text-pink-400' : 
                index % 3 === 1 ? 'bg-blue-100 text-blue-400 border border-blue-400' : 
                'bg-green-100 text-green-400 border border-green-400'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex -space-x-2">
            {Array.isArray(collaborators) && collaborators?.slice(0,2).map((collaborator: any, i: any) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">
                {collaborator?.firstName[0]}
              </div>
            ))}
            {collaborators.length > 3 && (
              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                +{collaborators.length - 3}
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