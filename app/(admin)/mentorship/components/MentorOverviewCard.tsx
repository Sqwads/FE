'use client';

import React from 'react';
import { FiCopy } from 'react-icons/fi';

interface MentorOverviewCardProps {
  name: string;
  joinDate: string;
  avatarUrl?: string;
  stats: {
    sessions: number;
    rating: number;
    totalRatings: number;
    duration: number;
    mentorId: string;
    lastSession: string;
  };
}

const MentorOverviewCard: React.FC<MentorOverviewCardProps> = ({
  name,
  joinDate,
  avatarUrl,
  stats
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
          {/* Avatar placeholder - will be replaced with actual image */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {!avatarUrl && name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-xs text-gray-500">JOINED {joinDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full md:w-auto md:ml-auto">
        <div>
          <p className="text-xs text-gray-500">No. of Sessions</p>
          <p className="text-[#16181BB2] ">{stats.sessions}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Mentor Rating</p>
          <p className="text-[#16181BB2] font-semibold">{stats.rating}/5.0 <span className="font-normal text-xs">({stats.totalRatings} Ratings)</span></p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Duration</p>
          <p className="text-[#16181BB2] font-semibold">{stats.duration} minutes</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Mentor ID</p>
          <div className="flex items-center">
            <p className="font-semibold text-[#16181BB2] mr-2">{stats.mentorId}</p>
            <button 
              onClick={() => copyToClipboard(stats.mentorId)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiCopy size={14} />
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Last Session</p>
          <p className="font-semibold text-[#16181BB2]">{stats.lastSession}</p>
        </div>
      </div>
    </div>
  );
};

export default MentorOverviewCard;
