import Link from 'next/link';
import React from 'react';
import { FiUser } from 'react-icons/fi'; 

interface WelcomeHeaderProps {
  mentorName: string;
  upcomingSessionsCount: number;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ mentorName, upcomingSessionsCount }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Welcome, Mentor {mentorName}! 👋
        </h1>
        <p className="text-sm text-gray-500">
          You have {upcomingSessionsCount} upcoming sessions.
        </p>
      </div>
      <Link href={"/mentor_settings"}>
      <button className="mt-3 sm:mt-0 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        View Profile
      </button>
      </Link>
    </div>
  );
};

export default WelcomeHeader;
