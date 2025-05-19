"use client";

import React from 'react';

// Define TypeScript interfaces for component props
interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs:string[];
  // Removed tabs array definition from here, should be passed as prop or defined in parent
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  // Define tabs within the component or pass as prop if they can change
  const tabs = ['Description',  'Discussion', 'Members'];
  
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-1 text-sm sm:text-base ${
              activeTab === tab
                ? 'text-[#001D69] border-b-4 rounded border-[#001D69] font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;

