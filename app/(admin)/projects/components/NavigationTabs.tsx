'use client';

import React from 'react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  totalApplications: number 
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  totalApplications
}) => {
  const tabs = ['Description', 'Members', 'Discussion', 'Applications'];
  
  return (
    <div
      className="flex  border-b mt-10 mb-6 overflow-x-scroll w-full"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>
      {`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
        display: none;
        }
      `}
      </style>
      <div className="hide-scrollbar flex lg:space-x-10 space-x-6 w-full">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`pb-2 font-medium flex ${
            activeTab === tab
            ? 'border-b-2 rounded border-[#001D69] text-[#001D69]'
            : 'text-gray-400 hover:text-blue-600'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}

          {(tab=='Applications' && totalApplications > 0) && 
            <div className='bg-[#001D69] ml-1 font-semibold text-xs h-4 w-4 rounded-full flex items-center justify-center text-white'>
              {totalApplications}
            </div>
          }
        </button>
      ))}
      </div>
    </div>
  );
};

export default NavigationTabs;
