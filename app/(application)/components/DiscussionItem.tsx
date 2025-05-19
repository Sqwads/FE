"use client";

import React from 'react';
import Image from 'next/image';
import { FiArrowUp, FiMessageSquare, FiMoreVertical } from 'react-icons/fi';

interface DiscussionItemProps {
  authorName: string;
  authorRole?: string;
  avatarUrl?: string;
  createdAt?: any;
  title?: string;
  upvotes?: number;
  comments?: number;
  isPinned?: boolean;
 
}

const DiscussionItem: React.FC<DiscussionItemProps> = ({ 
  authorName, 
  authorRole, 
  avatarUrl, 
  createdAt, 
  title, 
  upvotes, 
  comments, 
  isPinned = false ,
 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
      {/* Avatar */}
      <div className="flex-shrink-0 mr-3 mb-2 sm:mb-0">
        <Image 
          src='/images/signup_1.png' 
          alt={authorName} 
          width={40} 
          height={40} 
          className="rounded-full"
        />
      </div>

      {/* Discussion Content */}
      <div className="flex-grow w-full sm:w-auto">
        <p className="text-sm mb-1">
          <span className="font-medium">{title}</span>
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-medium text-blue-600">{authorName}</span>
          {authorRole && <span className="text-gray-400"> ({authorRole})</span>} • Created at {createdAt}
        </p>
      </div>

      {/* Stats & Actions */}
      <div className="flex items-center space-x-4 ml-0 sm:ml-4 mt-2 sm:mt-0 flex-shrink-0 w-full sm:w-auto justify-end sm:justify-start">
        <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 border border-gray-300 rounded-md px-2 py-1">
          <FiArrowUp className="mr-1" size={14} />
          <span>{comments}</span>
        </button>
        <div className="text-sm text-gray-500">
          {comments} comments
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <FiMoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default DiscussionItem;

