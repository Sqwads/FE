"use client";
import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

interface StatCardProps {
  icon?: React.ReactNode; 
  imageSrc?: string; 
  imageAlt?: string; 
  title: string;
  value: string | number;
  unit?: string;
  bgColorClass?: string; 
  textColorClass?: string; 
  iconBgClass?: string; 
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon,
  imageSrc,
  imageAlt = '', // Default alt text to empty string
  title, 
  value, 
  unit,
  bgColorClass = 'bg-white', 
  textColorClass = 'text-gray-800',
  iconBgClass = 'bg-gray-100'
}) => {
  return (
    // Removed the outer div from the original component, assuming it's applied where StatCard is used (like in the grid cell)
    <div className={`flex items-center py-7 rounded-lg border  px-4 space-x-4 ${bgColorClass} ${textColorClass}`}> 
      <div className={`p-3 rounded-full flex items-center justify-center ${iconBgClass}`}>
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={imageAlt} 
           
            className="object-cover h-7 w-7" // Optional: control how image fits
          />
        ) : (
          icon // Render the icon component if no imageSrc is provided
        )}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider opacity-80">{title}</p>
        <p className="text-2xl font-semibold">
          {value}
          {unit && <span className="text-lg font-medium opacity-90">{unit}</span>}
        </p>
      </div>
    </div>
  );
};

export default StatCard;

