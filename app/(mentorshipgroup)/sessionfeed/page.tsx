"use client";
import React, { useState } from 'react';
import Pending from './tabs/pending';
import Upcoming from './tabs/upcoming';
import History from './tabs/complete';

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
  const [activeTab, setActiveTab] = useState<'upcoming' | 'pending' | 'history'>('pending');
  
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
        {activeTab === 'pending' && <Pending />}
        {activeTab === 'upcoming' && <Upcoming />}
        {activeTab === 'history' && <History />}
      </div>
    </div>
  );
};

export default SessionsFeed;
