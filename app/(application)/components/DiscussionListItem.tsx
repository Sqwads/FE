import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUp, FiMessageSquare, FiMoreVertical, FiUserCheck } from 'react-icons/fi';

export interface DiscussionListItemProps {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    isAdmin?: boolean;
  };
  title: string;
  lastCommentTime: string;
  upvotes: number;
  commentsCount: number;
  projectSlug: string; // To construct the link to the discussion thread
  isPinned?: boolean;
}

const DiscussionListItem: React.FC<DiscussionListItemProps> = ({
  id,
  author,
  title,
  lastCommentTime,
  upvotes,
  commentsCount,
  projectSlug,
  isPinned,
}) => {
  return (
    <div className="flex items-start py-4 px-1 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex-shrink-0 mr-3">
        <Image 
          src={author.avatarUrl || '/images/default_avatar.png'} 
          alt={author.name} 
          width={40} 
          height={40} 
          className="rounded-full"
        />
      </div>
      <div className="flex-grow">
      <Link 
  href={{
    pathname: '/dashboard/projects/[projectSlug]/discussions/[id]',
    query: { projectSlug: projectSlug, id: id },
  }}
  className="hover:underline"
>
          <h4 className="text-sm font-semibold text-gray-800 mb-0.5 cursor-pointer">{title}</h4>
        </Link>
        <div className="text-xs text-gray-500 flex items-center space-x-2">
          <span>{author.name}</span>
          {author.isAdmin && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              <FiUserCheck className="w-3 h-3 mr-0.5" /> Admin
            </span>
          )}
          <span>&bull;</span>
          <span>Last Comment {lastCommentTime}</span>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4 flex items-center space-x-4">
        <button className="flex items-center text-xs text-gray-600 hover:text-blue-600 focus:outline-none">
          <FiArrowUp className="w-4 h-4 mr-1" />
          <span>{upvotes}</span>
        </button>
        <div className="flex items-center text-xs text-gray-600">
          <FiMessageSquare className="w-4 h-4 mr-1" />
          <span>{commentsCount}</span>
        </div>
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <FiMoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DiscussionListItem;

