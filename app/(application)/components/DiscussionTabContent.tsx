"use client";

import React, { useState } from 'react';
import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi';
import DiscussionItem from './DiscussionItem'; 

// Sample Data (based on user's text file and screenshot)
export const sampleDiscussions = [
  {
    authorName: "Squads Admin",
    avatarUrl: "/images/avatar1.jpg", // Placeholder image path
    lastCommentTime: "12 hours ago",
    title: "This Project has an official Whatsapp Group",
    upvotes: 25,
    comments: 20,
    isPinned: true,
  },
  {
    authorName: "Squads Admin",
    avatarUrl: "/images/avatar2.jpg", // Placeholder image path
    lastCommentTime: "12 hours ago",
    title: "This Project has an official Whatsapp Group",
    upvotes: 25,
    comments: 20,
    isPinned: true,
  },
  {
    authorName: "Adebayo Lawal",
    avatarUrl: "/images/avatar3.jpg", // Placeholder image path
    lastCommentTime: "12 hours ago",
    title: "This Project has an official Whatsapp Group",
    upvotes: 25,
    comments: 20,
    isPinned: false,
  },
  {
    authorName: "Olutimi Odunwole",
    avatarUrl: "/images/avatar4.jpg", // Placeholder image path
    lastCommentTime: "12 hours ago",
    title: "This Project has an official Whatsapp Group",
    upvotes: 25,
    comments: 20,
    isPinned: false,
  },
    {
    authorName: "Olutimi Odunwole",
    avatarUrl: "/images/avatar5.jpg", // Placeholder image path
    lastCommentTime: "12 hours ago",
    title: "This Project has an official Whatsapp Group",
    upvotes: 25,
    comments: 20,
    isPinned: false,
  },
    {
    authorName: "Olutimi Odunwole",
    avatarUrl: "/images/avatar6.jpg", // Placeholder image path
    lastCommentTime: "12 hours ago",
    title: "This Project has an official Whatsapp Group",
    upvotes: 25,
    comments: 20,
    isPinned: false,
  },
    {
    authorName: "Olutimi Odunwole",
    avatarUrl: "/images/avatar7.jpg", // Placeholder image path
    lastCommentTime: "12 hours ago",
    title: "This Project has an official Whatsapp Group",
    upvotes: 25,
    comments: 20,
    isPinned: false,
  },
  // Add more sample discussions if needed
];

const DiscussionTabContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Owned'>('All');
  const [sortOrder, setSortOrder] = useState('Popular');

  const pinnedDiscussions = sampleDiscussions.filter(d => d.isPinned);
  const otherDiscussions = sampleDiscussions.filter(d => !d.isPinned);

  // TODO: Implement actual filtering based on searchTerm and activeFilter
  // TODO: Implement actual sorting based on sortOrder

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Discussions</h2>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 gap-3 md:gap-4">
        <div className="relative w-full md:flex-grow">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Enter Keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex-shrink-0">
          <FiFilter className="mr-2" />
          Filter
        </button>
      </div>

      {/* Filter Tabs and Sort Dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="flex space-x-4 border-b border-gray-200 mb-3 sm:mb-0">
          <button 
            className={`pb-2 px-1 text-sm sm:text-base ${activeFilter === 'All' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveFilter('All')}
          >
            All
          </button>
          <button 
            className={`pb-2 px-1 text-sm sm:text-base ${activeFilter === 'Owned' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveFilter('Owned')}
          >
            Owned
          </button>
        </div>
        <div className="relative">
          {/* Basic dropdown appearance, functionality to be added */}
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
            {sortOrder}
            <FiChevronDown className="ml-1" />
          </button>
          {/* Dropdown menu would go here */}
        </div>
      </div>

      {/* Pinned Discussions */}
      {pinnedDiscussions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Pinned discussions</h3>
          {pinnedDiscussions.map((discussion, index) => (
            <DiscussionItem key={`pinned-${index}`} {...discussion} />
          ))}
        </div>
      )}

      {/* Other Discussions */}
      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">Other discussions</h3>
        {otherDiscussions.length > 0 ? (
          otherDiscussions.map((discussion, index) => (
            <DiscussionItem key={`other-${index}`} {...discussion} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">No other discussions yet.</p>
        )}
      </div>
    </div>
  );
};

export default DiscussionTabContent;

