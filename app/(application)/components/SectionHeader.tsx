"use client";

import React from 'react';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
  showSeeAll?: boolean;
  seeAllLink?: string; // Add this line
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  icon, 
  showSeeAll = false,
  seeAllLink = "#" // Add with default value
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <span className="mr-2 text-gray-500">{icon}</span>
        <h2 className="font-semibold lg:text-3xl text-xl">{title}</h2>
      </div>
      {showSeeAll && (
        <Link href={seeAllLink} className="text-blue-600 text-sm font-medium inline-flex items-center">
          See all <HiOutlineArrowRight className="ml-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;