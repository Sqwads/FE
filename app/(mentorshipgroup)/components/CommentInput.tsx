"use client";

import React, { useState } from 'react';
import { FiSmile, FiPaperclip } from 'react-icons/fi';

// Define interface for props
interface CommentInputProps {
  onCommentSubmit: (commentText: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim()) {
      onCommentSubmit(commentText);
      setCommentText(''); // Clear input after submit
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Type your comment here |"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y mb-3"
        rows={10}
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-700">
            <FiSmile size={18} />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <FiPaperclip size={18} />
          </button>
        </div>
        <button 
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-50"
          disabled={!commentText.trim()}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentInput;

