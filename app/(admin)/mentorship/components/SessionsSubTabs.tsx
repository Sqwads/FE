'use client';

import React from 'react';

interface SessionsSubTabsProps {
  activeSubTab: 'upcoming' | 'pending' | 'past' | 'cancelled';
  onSubTabChange: (subTab: 'upcoming' | 'pending' | 'past' | 'cancelled') => void;
}

const SessionsSubTabs: React.FC<SessionsSubTabsProps> = ({
  activeSubTab,
  onSubTabChange
}) => {
  const tabs = [
    { key: 'upcoming' as const, label: 'Upcoming' },
    { key: 'pending' as const, label: 'Pending' },
    { key: 'past' as const, label: 'Past' },
    { key: 'cancelled' as const, label: 'Cancelled' }
  ];

  return (
    <div className="flex space-x-1 mb-6 p-1 bg-gray-100 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeSubTab === tab.key
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => onSubTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SessionsSubTabs;