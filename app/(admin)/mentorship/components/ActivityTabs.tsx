'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import { useParams } from 'next/navigation';

interface ActivityTabsProps {
  activeTab: 'sessions' | 'reviews';
  onTabChange: (tab: 'sessions' | 'reviews') => void;
}

interface SessionItem {
  id: string;
  date: {
    day: string;
    dayOfMonth: number;
    month?: string;
  };
  time: string;
  sessionType: string;
  title: string;
  participants: Array<{
    name: string;
  }>;
}

const ActivityTabs: React.FC<ActivityTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  const params = useParams();
  const mentorId = params.id;

  // Fetch session log data
  const { data: sessionsResponse, isLoading: sessionsLoading } = useQuery({
    queryFn: () => instance.get(`/mentors/mentor-bookings/${mentorId}`),
    queryKey: ['mentor-sessions', mentorId],
    enabled: !!mentorId && activeTab === 'sessions',
  });

  const transformSessionsData = (apiData: any): SessionItem[] => {
    if (!apiData?.data) return [];
    
    return apiData.data.map((session: any, index: number) => ({
      id: session.id || session._id || `session-${index}`,
      date: {
        day: new Date(session.date || session.createdAt).toLocaleDateString('en-US', { weekday: 'short' }),
        dayOfMonth: new Date(session.date || session.createdAt).getDate(),
        month: new Date(session.date || session.createdAt).toLocaleDateString('en-US', { month: 'short' }),
      },
      time: session.time || `${session.startTime} - ${session.endTime}` || 'Time not specified',
      sessionType: session.type || session.sessionType || 'Mentoring Session',
      title: session.title || `Session ${index + 1}`,
      participants: session.participants ? session.participants.map((p: any) => ({
        name: p.name || `${p.firstName} ${p.lastName}` || p.email || 'Unknown User'
      })) : [{ name: 'No participants listed' }]
    }));
  };

  const sessionsData = sessionsResponse?.data ? transformSessionsData(sessionsResponse.data) : [];

  return (
    <div className="border-b border-gray-200 mb-4">
      <div className="flex">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'sessions'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onTabChange('sessions')}
        >
          Sessions Log
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'reviews'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onTabChange('reviews')}
        >
          Reviews
        </button>
      </div>

      {/* Session Log Content */}
      {activeTab === 'sessions' && (
        <div className="mt-4">
          {sessionsLoading ? (
            <div className="py-4 text-center text-gray-500">
              Loading sessions...
            </div>
          ) : sessionsData.length === 0 ? (
            <div className="py-4 text-center text-gray-500">
              No sessions found for this mentor.
            </div>
          ) : (
            <div className="space-y-4">
              {sessionsData.map((session) => (
                <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="text-center bg-blue-50 rounded-lg p-2 min-w-12">
                        <div className="text-sm font-semibold text-blue-600">{session.date.day}</div>
                        <div className="text-lg font-bold">{session.date.dayOfMonth}</div>
                        {session.date.month && (
                          <div className="text-xs text-gray-500">{session.date.month}</div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{session.title}</h3>
                        <p className="text-sm text-gray-600">{session.sessionType}</p>
                        <p className="text-sm text-gray-500 mt-1">{session.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {session.participants.length} participant{session.participants.length !== 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 max-w-32 truncate">
                        {session.participants.map(p => p.name).join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityTabs;