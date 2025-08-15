"use client";
import React, { Suspense, useEffect, useState } from 'react';
import Pending from './tabs/pending';
import Upcoming from './tabs/upcoming';
import History from './tabs/complete';
import { useSearchParams } from 'next/navigation';
import { instance } from '@/api/instance';
import { useQuery } from '@tanstack/react-query';

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium relative ${
        isActive ? 'text-blue-900' : 'text-gray-500 hover:text-gray-700'
      }`}
      onClick={onClick}
    >
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900"></div>
      )}
    </button>
  );
};



const SessionsFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('upcoming');

  const statuses: any = {
    upcoming: 'UPCOMING',
    pending: 'PENDING',
    history: 'COMPLETED',
    complete: 'COMPLETED'
  }

  const searchParams = useSearchParams();
  const tabFromParams = searchParams.get('tabs') 

  useEffect(() => {
    if (tabFromParams) {
      setActiveTab(tabFromParams =='complete' ? 'history' : tabFromParams);
    }
  }, [tabFromParams]);

  const {data:bookinsResponse, isPending: bookingIsLoading} = useQuery({
    queryFn: () => instance.get('/mentors/mentor-bookings', {
    params: {
      status: statuses[activeTab],
    }
    }),
    queryKey: ['mentor-bookingss',activeTab],
  });
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Sessions Feed</h1>
        <p className="text-sm text-gray-500">
          Track all your mentoring sessions, from upcoming commitments to completed milestones.
        </p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-4">
          <Tab 
            label="Upcoming" 
            isActive={activeTab === 'upcoming'} 
            onClick={() => setActiveTab('upcoming')} 
          />
          <Tab 
            label="Pending" 
            isActive={activeTab === 'pending'} 
            onClick={() => setActiveTab('pending')} 
          />
          <Tab 
            label="History" 
            isActive={activeTab === 'history'} 
            onClick={() => setActiveTab('history')} 
          />
        </div>
      </div>
      
      {/* Content based on active tab */}
      <div className="bg-gray-50 rounded-lg border border-gray-100">
        {activeTab === 'pending' && <Pending data={bookinsResponse?.data?.data || []} />}
        {activeTab === 'upcoming' && <Upcoming data={bookinsResponse?.data?.data || []} />}
        {activeTab === 'history' && <History data={bookinsResponse?.data?.data || []} />}
      </div>
    </div>
  );
};

const SessionFeedWrapper = () => {
  return (
   
      <Suspense fallback={
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading sessions...</p>
        </div>
      }>
        <SessionsFeed />  
      </Suspense>
   
  );
}

export default SessionFeedWrapper;
