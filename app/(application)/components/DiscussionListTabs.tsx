import React from 'react';

interface DiscussionListTabsProps {
  activeSubTab: string;
  onSubTabChange: (tabName: string) => void;
  tabs: string[];
}

const DiscussionListTabs: React.FC<DiscussionListTabsProps> = ({
  activeSubTab,
  onSubTabChange,
  tabs,
}) => {
  return (
    <div className="mb-5 border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onSubTabChange(tab)}
            className={`
              ${tab === activeSubTab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
              whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none
            `}
            aria-current={tab === activeSubTab ? 'page' : undefined}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DiscussionListTabs;

