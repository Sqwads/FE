"use client";

import React from 'react';

// Define interface for props
interface Reaction {
  emoji: string;
  count: number;
}

interface ReactionButtonsProps {
  reactions: Reaction[];
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ reactions }) => {
  return (
    <div className="flex items-center space-x-2 mt-4 mb-6 border-b border-gray-100 pb-6">
      {reactions.map((reaction, index) => (
        <button 
          key={index} 
          className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm transition-colors duration-150"
        >
          <span>{reaction.emoji}</span>
          <span className="ml-1 font-medium">{reaction.count}</span>
        </button>
      ))}
      <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm transition-colors duration-150">
        <span>+</span>
      </button>
    </div>
  );
};

export default ReactionButtons;

