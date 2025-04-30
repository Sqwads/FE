"use client";

import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

interface CompletionIndicatorProps {
  percentage: number;
  label?: string;
}

const CompletionIndicator: React.FC<CompletionIndicatorProps> = ({ 
  percentage, 
  label 
}) => {
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.min(100, Math.max(0, percentage));
  
  // Determine color based on percentage
  const getColor = () => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>{label}</span>
          <span>{validPercentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${getColor()} h-2 rounded-full`} 
          style={{ width: `${validPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CompletionIndicator;
