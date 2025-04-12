'use client';

import React, { useState } from 'react';

interface SessionsSubTabsProps {
  activeSubTab: 'upcoming' | 'pending' | 'past' | 'cancelled';
  onSubTabChange: (subTab: 'upcoming' | 'pending' | 'past' | 'cancelled') => void;
}

const SessionsSubTabs: React.FC<SessionsSubTabsProps> = ({
  activeSubTab,
  onSubTabChange
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        className={`px-4 py-2 text-sm rounded-full ${
          activeSubTab === 'upcoming'
            ? 'bg-gray-100 text-[#16181B]'
            : ' text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onSubTabChange('upcoming')}
      >
        Upcoming
      </button>
      <button
        className={`px-4 py-2 text-sm rounded-full ${
          activeSubTab === 'pending'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onSubTabChange('pending')}
      >
        Pending
      </button>
      <button
        className={`px-4 py-2 text-sm rounded-full ${
          activeSubTab === 'past'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onSubTabChange('past')}
      >
        Past
      </button>
      <button
        className={`px-4 py-2 text-sm rounded-full ${
          activeSubTab === 'cancelled'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onSubTabChange('cancelled')}
      >
        Cancelled
      </button>
    </div>
  );
};

export default SessionsSubTabs;
