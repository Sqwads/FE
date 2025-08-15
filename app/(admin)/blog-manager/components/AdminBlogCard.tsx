"use client";

import React from 'react';
import { FiEdit, FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { extractPlainTextFromHTML, generateSlug, trimSentence } from '@/common';





const AdminBlogCard= ({ post }:{
  post: any;
}) => {
  const router = useRouter(); 

  const handleEditPost = () => {
    router.push(`/blog-manager/create?edit=${post._id}`);
  };

  const handleViewPost = () => {
    router.push(`/blog-manager/view/${generateSlug(post?.title)}-${post._id}`); 
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-200">
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <img
          src={post?.cover_image || '/images/blog-placeholder.png'}
          alt={post.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          
          loading="lazy"
        />
      </div>
      
      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {post.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {trimSentence(extractPlainTextFromHTML(post.content), 100)}
        </p>
        
        {/* Action Buttons - Fixed alignment and equal width */}
        <div className="flex items-center gap-3 mt-auto">
          <button
            onClick={handleEditPost}
            className="flex items-center justify-center px-4 py-2.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex-1 min-w-0"
          >
            <FiEdit className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">Edit Post</span>
          </button>
          
          <button
            onClick={handleViewPost}
            className="flex items-center justify-center px-4 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex-1 min-w-0"
          >
            <FiEye className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">View Post</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCard;