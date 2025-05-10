import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

interface DiscussionSearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterClick: () => void;
}

const DiscussionSearchBar: React.FC<DiscussionSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
      <div className="relative flex-grow w-full sm:w-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="search-discussions"
          id="search-discussions"
          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 text-sm shadow-sm"
          placeholder="Enter Keyword"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button
        type="button"
        onClick={onFilterClick}
        className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FiFilter className="h-5 w-5 text-gray-500 mr-2" aria-hidden="true" />
        Filter
      </button>
    </div>
  );
};

export default DiscussionSearchBar;

