"use client";

import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, actionText, actionLink }) => {
  return (
    <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm text-center">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
      </div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      <Link href={actionLink} className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
        {actionText}
      </Link>
    </div>
  );
};

export default EmptyState;
