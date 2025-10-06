'use client';

import React from 'react';
import { Clock, User } from 'lucide-react';

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
  const groupSessionsByMonth = () => {
    const groups: { month?: string; sessions: SessionItem[] }[] = [];
    let currentGroup: { month?: string; sessions: SessionItem[] } = { sessions: [] };

    sessions.forEach((session, index) => {
      if (session.date.month && 
          (currentGroup.month !== session.date.month || currentGroup.sessions.length === 0)) {
        if (currentGroup.sessions.length > 0) groups.push(currentGroup);
        currentGroup = { month: session.date.month, sessions: [session] };
      } else {
        currentGroup.sessions.push(session);
      }

      if (index === sessions.length - 1 && currentGroup.sessions.length > 0) {
        groups.push(currentGroup);
      }
    });

    return groups;
  };

  const sessionGroups = groupSessionsByMonth();

  if (sessions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <User className="w-12 h-12 mx-auto text-gray-300 mb-4" />
        <p>No sessions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sessionGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-4">
          {/* Month Header */}
          {group.month && (
            <h3 className="text-lg font-semibold text-gray-900 px-2">
              {group.month}
            </h3>
          )}

          {/* Sessions List */}
          <div className="space-y-3">
            {group.sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-6">
                  {/* Date Section */}
                  <div className="flex flex-col items-center min-w-[50px]">
                    <span className="text-sm font-medium text-gray-600 uppercase">
                      {session.date.day}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      {session.date.dayOfMonth}
                    </span>
                  </div>

                  {/* Session Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{session.time}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                        {session.sessionType}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-gray-900 font-medium">
                        {session.title}
                      </span>
                      <span className="text-gray-400">⇔</span>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-700">
                          {session.participants[0]?.name || 'No participant'}
                          {session.participants.length > 1 && (
                            <span className="text-gray-500">
                              {' '}& {session.participants.length - 1} others
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionsList;