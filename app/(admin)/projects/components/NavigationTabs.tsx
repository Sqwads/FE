'use client';

import React from 'react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = ['Description', 'Members', 'Discussion'];
  
  return (
    <div className="flex space-x-6 border-b mt-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`pb-2 font-medium ${
            activeTab === tab
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
