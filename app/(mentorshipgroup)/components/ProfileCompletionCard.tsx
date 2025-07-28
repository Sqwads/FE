"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi'; // Using react-icons

interface ProfileCompletionCardProps {
  onDismiss?: () => void; // Optional dismiss handler
}

const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({ onDismiss }) => {
  // Example progress - replace with actual logic
  const completionProgress = 70; // Example: 70%
  const router = useRouter()

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 relative mb-6 cursor-pointer" onClick={()=>router.push('/mentor_settings')}>
      <div className="flex items-start gap-3">
        <div className="p-1 bg-blue-100 rounded-full mt-1">
           <FiCheckCircle className="h-4 w-4 text-blue-600" />
        </div>
        <div className="flex-grow">
          <p className="text-sm font-medium text-gray-800 mb-1">Finish Setting Up Your Profile</p>
          <p className="text-xs text-gray-500 mb-2">You&apos;re almost there! Just a few more details to get the best Sqwads experience.</p>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${completionProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1"
          aria-label="Dismiss notification"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ProfileCompletionCard;
