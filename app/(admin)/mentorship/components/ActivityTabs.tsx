'use client';

import React, { useState } from 'react';

interface ActivityTabsProps {
  activeTab: 'sessions' | 'reviews';
  onTabChange: (tab: 'sessions' | 'reviews') => void;
}

const ActivityTabs: React.FC<ActivityTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="border-b border-gray-200 mb-4">
      <div className="flex">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'sessions'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onTabChange('sessions')}
        >
          Sessions Log
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'reviews'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onTabChange('reviews')}
        >
          Reviews
        </button>
      </div>
    </div>
  );
};

export default ActivityTabs;
