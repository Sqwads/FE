"use client";
import React from 'react';
import Image from 'next/image'; // Assuming Next.js Image component
import { FiCalendar, FiClock, FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';

// Sample data structure - replace with actual data and types
interface Session {
  id: string;
  type: 'upcoming' | 'past';
  participantName: string;
  participantImage: string; // URL or path to image
  date: string;
  time: string;
}

// Sample data - replace with actual data fetching
const sessionsData: Session[] = [
  {
    id: '1',
    type: 'upcoming',
    participantName: 'Saad Bashar',
    participantImage: '/images/bashar.png',
    date: '27/05/2025',
    time: '09:00 am',
  },
  {
    id: '2',
    type: 'past',
    participantName: 'Comfort Tayo',
    participantImage: '/images/tayo.png', // Replace with actual path
    date: '23/05/2025',
    time: '09:00 am',
  },
  // Add more sessions as needed
];

const SessionsFeed = () => {
  // Add filtering logic if needed (e.g., based on the 'All' dropdown)
  const upcomingSessions = sessionsData.filter(s => s.type === 'upcoming');
  const pastSessions = sessionsData.filter(s => s.type === 'past');

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Sessions Feed</h3>
        {/* Placeholder for filter dropdown */}
        <button className="flex items-center text-xs text-gray-500 border rounded px-2 py-1 hover:bg-gray-100">
          All <FiChevronDown className="ml-1 h-3 w-3" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Upcoming Sessions */}
        {upcomingSessions.map((session) => (
          <div key={session.id} className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <Image 
                src={session.participantImage} 
                alt={session.participantName} 
                width={40} 
                height={40} 
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">Upcoming mentorship session with {session.participantName}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><FiCalendar className="h-3 w-3" /> {session.date}</span>
                  <span className="flex items-center gap-1"><FiClock className="h-3 w-3" /> {session.time}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3 sm:mt-0 flex-shrink-0">
              <Link href='/sessionfeed'>
                  <button className="px-4 py-1.5 bg-[#001D69] text-white rounded-md text-xs font-medium hover:bg-blue-800 transition-colors">
                    Join Session
                  </button>
              </Link>
             
              <button className="px-4 py-1.5 border border-gray-300 rounded-md text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors">
                Message
              </button>
            </div>
          </div>
        ))}

        {/* Past Sessions */}
        {pastSessions.map((session) => (
           <div key={session.id} className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 opacity-70">
            <div className="flex items-center gap-3">
              <Image 
                src={session.participantImage} 
                alt={session.participantName} 
                width={40} 
                height={40} 
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">Past mentorship session with {session.participantName}</p>
                 <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><FiCalendar className="h-3 w-3" /> {session.date}</span>
                  <span className="flex items-center gap-1"><FiClock className="h-3 w-3" /> {session.time}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3 sm:mt-0 flex-shrink-0">
              <button className="px-4 py-1.5 border border-gray-300 rounded-md text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors">
                Message
              </button>
            </div>
          </div>
        ))}
        
        {/* Add empty state if needed */}
        {sessionsData.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-4">No sessions found.</p>
        )}
      </div>
    </div>
  );
};

export default SessionsFeed;
