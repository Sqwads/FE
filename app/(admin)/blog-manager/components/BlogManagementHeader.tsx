"use client"
import Link from 'next/link';
import React from 'react';
import { FiArchive, FiPlus } from 'react-icons/fi';

const BlogManagementHeader: React.FC = () => {
  const handleArchivePost = () => {
    console.log('Archive post clicked');
  };

  const handleCreatePost = () => {
    console.log('Create post clicked');
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
      {/* Title and Description */}
      <div className="mb-6 lg:mb-0">
        <h1 className="text-3xl font-semibold text-[#0234B8] mb-2">
          Blog Management
        </h1>
        <p className="text-gray-600 text-lg">
          Create, edit, publish, or archive blog posts. Stay in control of your content all in one place.
        </p>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        {/* <button 
          onClick={handleArchivePost}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-[#0234B8] hover:bg-[#a6b7e7] transition-colors duration-300"
        >
          <FiArchive className="w-4 h-4 mr-2" />
          Archive Post
        </button> */}
        
        <Link href="/blog-manager/create">
            <button 
              onClick={handleCreatePost}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-[#0234B8] transition-colors duration-300"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Create Post
            </button>
        </Link>
       
      </div>
    </div>
  );
};

export default BlogManagementHeader;

