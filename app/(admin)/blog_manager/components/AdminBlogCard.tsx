"use client";

import React from 'react';
import { FiEdit, FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

// Define the blog post data type
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  author?: string;
  status: 'published' | 'draft' | 'archived';
}

interface AdminBlogCardProps {
  post: BlogPost;
}

const AdminBlogCard: React.FC<AdminBlogCardProps> = ({ post }) => {
  const router = useRouter(); 

  const handleEditPost = () => {
    console.log('Edit post:', post.id);
  };

  const handleViewPost = () => {
    console.log('View post:', post.slug);
    router.push(`/blog_manager/view/${post.id}`); 
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-100">
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <img
          src={post.image}
          alt={post.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/400x300/f3f4f6/6b7280?text=${encodeURIComponent(post.title.slice(0, 20))}`;
          }}
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
          {post.description}
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