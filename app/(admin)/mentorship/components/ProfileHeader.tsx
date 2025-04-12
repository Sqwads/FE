'use client';

import React from 'react';

interface ProfileHeaderProps {
  title: string;
  subtitle?: string;
  actionButtonText?: string;
  onActionClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  title,
  subtitle,
  actionButtonText,
  onActionClick
}) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold text-blue-900">{title}</h1>
        {subtitle && (
          <a href="#" className="text-blue-600 text-sm hover:underline">
            {subtitle}
          </a>
        )}
      </div>
      {actionButtonText && (
        <button
          onClick={onActionClick}
          className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors flex items-center"
        >
          {actionButtonText} →
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;
