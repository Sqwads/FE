import React, { useState } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

interface DiscussionSortDropdownProps {
  options: string[]; // e.g., ['Popular', 'Latest', 'Oldest']
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}

const DiscussionSortDropdown: React.FC<DiscussionSortDropdownProps> = ({
  options,
  selectedOption,
  onOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          <FiChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`${option === selectedOption ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}
                  flex justify-between w-full px-4 py-2 text-sm text-left hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
                tabIndex={-1}
                id={`menu-item-${option}`}
              >
                {option}
                {option === selectedOption && (
                  <FiCheck className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionSortDropdown;

