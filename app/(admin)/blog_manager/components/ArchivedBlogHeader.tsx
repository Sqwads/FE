"use client";

import Link from 'next/link';
import React from 'react';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const ArchivedBlogHeader: React.FC = () => {
  const router = useRouter();

  const handleBackToBlog = () => {
    router.push('/blog_manager');
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
      {/* Back Button and Title Section */}
      <div className="mb-6 lg:mb-0">
        <button 
          onClick={handleBackToBlog}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300 mb-4"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          Back to Blog
        </button>
        
        <h1 className="text-3xl font-semibold text-[#0234B8] mb-2">
          Archived Blog Posts
        </h1>
        <p className="text-gray-600 text-lg">
          Manage blog posts hidden from public view. You can restore them or delete them permanently.
        </p>
      </div>
      
      {/* Action Button */}
      <div className="flex items-center">
        <Link 
          href="/blog_manager/create" 
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Create Post
        </Link>
      </div>
    </div>
  );
};

export default ArchivedBlogHeader;