'use client';

import React from 'react';
import { FiClock, FiUsers } from 'react-icons/fi';

export interface SessionItem {
  id: string;
  date: {
    day: string;
    dayOfMonth: number;
    month?: string;
  };
  time: string;
  sessionType: string;
  title: string;
  participants: {
    name: string;
    avatar?: string;
  }[];
}

interface SessionsListProps {
  sessions: SessionItem[];
}

const SessionsList: React.FC<SessionsListProps> = ({ sessions }) => {
  return (
    <div className="space-y-6">
      {sessions.map((session) => (
        <div key={session.id} className="mb-6">
          <div className="flex items-start">
            <div className="flex flex-col items-center mr-6">
              <div className="text-gray-500 text-sm">{session.date.day}</div>
              <div className="text-2xl font-bold">{session.date.dayOfMonth}</div>
              {session.date.month && (
                <div className="text-gray-500 text-sm">{session.date.month}</div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <FiClock className="mr-1" /> {session.time}
              </div>
              <div className="text-sm font-medium mb-1">{session.title}</div>
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-2">
                  {session.participants.map((participant, index) => (
                    <div 
                      key={index} 
                      className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs overflow-hidden"
                    >
                      {participant.avatar ? (
                        <div className="w-full h-full">
                          <div className="w-full h-full flex items-center justify-center">
                            {participant.name.charAt(0)}
                          </div>
                        </div>
                      ) : (
                        participant.name.charAt(0)
                      )}
                    </div>
                  ))}
                </div>
                {session.participants.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {session.sessionType} to {session.participants[0].name}
                    {session.participants.length > 1 && ` & ${session.participants.length - 1} others`}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionsList;
