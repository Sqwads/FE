"use client";

import React from 'react';
import Image from 'next/image';
import { FiArrowUp, FiMoreVertical, FiSmile, FiPaperclip } from 'react-icons/fi';
import { BiSolidCommentDetail } from "react-icons/bi";
// Define interfaces for props
interface DiscussionPostProps {
  authorName: string;
  avatarUrl: string;
  postedTime: string;
  title: string;
  content: string; // Assuming content is HTML or markdown string
  upvotes: number;
  commentsCount: number;
}

const DiscussionPost: React.FC<DiscussionPostProps> = ({ 
  authorName, 
  avatarUrl, 
  postedTime, 
  title, 
  content, 
  upvotes, 
  commentsCount 
}) => {
  return (
    <div className="mb-8">
      {/* Author Info */}
      <div className="lg:flex items-center justify-between mb-7">
        <div className="flex items-center lg:mb-0 mb-4">
          <Image 
            src={'/images/signup_1.png'} 
            alt={authorName} 
            width={40} 
            height={40} 
            className="rounded-full mr-3"
          />
          <div>
            <span className="font-medium text-blue-600">{authorName}</span>
            <span className="text-gray-500 text-sm"> • POSTED {postedTime}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-2 py-1">
            <FiArrowUp className="mr-1" size={14} />
            <span>{upvotes}</span>
          </button>
          <div className=" flex text-sm text-gray-500">
            
            {commentsCount} comments
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <FiMoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Post Title and Content */}
      <h2 className="text-2xl font-medium text-[#001D69] mb-4">{title}</h2>
      {/* Render content - assuming simple paragraphs for now */}
      <div className="prose prose-sm max-w-none text-[#16181B80]" dangerouslySetInnerHTML={{ __html: content.replace(/\\n/g, '<br />') }}>
        {/* Content will be rendered here */}
      </div>
    </div>
  );
};

export default DiscussionPost;

