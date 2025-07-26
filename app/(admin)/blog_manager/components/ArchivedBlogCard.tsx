"use client";

import React from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';
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

interface ArchivedBlogCardProps {
  post: BlogPost;
}

const ArchivedBlogCard: React.FC<ArchivedBlogCardProps> = ({ post }) => {
  const router = useRouter();

  const handleViewPost = () => {
    console.log('View archived post:', post.slug);
    router.push(`/blog_manager/view/${post.id}?archived=true`);
  };

  const handlePublishPost = () => {
    console.log('Publish post:', post.id);
  };

  const handleDeletePost = () => {
    const confirmed = window.confirm('Are you sure you want to permanently delete this post?');
    if (confirmed) {
      console.log('Delete post:', post.id);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col relative">
      {/* Delete Icon - Top Right Corner */}
      <button
        onClick={handleDeletePost}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors duration-300"
      >
        <FiTrash2 className="w-4 h-4 text-red-600" />
      </button>

      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-200">
        <img
          src={post.image}
          alt={post.title}
          className="object-cover w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/400x300/e5e7eb/6b7280?text=${encodeURIComponent(post.title.slice(0, 20))}`;
          }}
        />
      </div>
      
      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {post.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {post.description}
        </p>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-auto">
          <button
            onClick={handleViewPost}
            className="flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300 flex-1"
          >
            <FiEye className="w-4 h-4 mr-1" />
            View Post
          </button>
          
          <button
            onClick={handlePublishPost}
            className="flex items-center justify-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex-1"
          >
            <FiEye className="w-4 h-4 mr-1" />
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchivedBlogCard;