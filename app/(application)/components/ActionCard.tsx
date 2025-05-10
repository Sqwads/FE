"use client";

import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

const ActionCard = ({ 
  title, 
  description, 
  icon, 
  illustration, 
  progress, 
  actionLink, 
  actionText 
}: any) => {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
      <div className="flex items-start">
        {icon && <div className="mr-3 mt-1">{icon}</div>}
        {illustration && (
          <div className="flex-shrink-0 mr-4">
            {/* Using img instead of Next.js Image */}
            <img 
              src={illustration} 
              alt={title} 
              className="w-16 h-16 object-contain"
              width={64}
              height={64}
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          
          {progress !== undefined && (
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          
          {actionLink && actionText && (
            <div className="text-right">
              <Link href={actionLink} className="text-blue-600 text-sm font-medium inline-flex items-center">
                {actionText} <HiOutlineArrowRight className="ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionCard;