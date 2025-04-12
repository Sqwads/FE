'use client';

import React, { useState } from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import MentorOverviewCard from '../../components/MentorOverviewCard';
import PersonalInfo from '../../components/PersonalInfo';
import ActivityTabs from '../../components/ActivityTabs';
import SessionsSubTabs from '../../components/SessionsSubTabs';
import SessionsList, { SessionItem } from '../../components/SessionsList';

const MentorProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sessions' | 'reviews'>('sessions');
  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'pending' | 'past' | 'cancelled'>('upcoming');

  // Sample data for mentor profile
  const mentorData = {
    name: 'Kunle Adebayo',
    joinDate: 'MARCH 2, 2024',
    stats: {
      sessions: 40,
      rating: 4.8,
      totalRatings: 25,
      duration: 500,
      mentorId: '0123456789',
      lastSession: 'Yesterday, 05:30pm'
    },
    personalInfo: {
      fullName: 'Nnenna Oyekachi',
      email: 'noyekachi@gmail.com',
      role: 'Senior UI/UX Designer',
      organization: 'Deloitte',
      bio: 'With 8 years in the design field, I specialize in crafting user-focused experiences that are intuitive and engaging. My goal is to create interfaces that balance functionality and beauty, whether it\'s for desktop or large-scale platforms. I\'m passionate about understanding user needs, advocating for seamless interactions, and continuously refining my craft to bring meaningful solutions to life.',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com'
      }
    }
  };

  // Sample data for sessions
  const upcomingSessions: SessionItem[] = [
    {
      id: '1',
      date: {
        day: 'Wed',
        dayOfMonth: 25
      },
      time: '09:00-09:30',
      sessionType: 'General Review Session',
      title: 'General Review Session',
      participants: [
        { name: 'Nnenna Oyekachi' }
      ]
    },
    {
      id: '2',
      date: {
        day: 'Fri',
        dayOfMonth: 27
      },
      time: '09:00-09:30',
      sessionType: 'Weekly Digest Session',
      title: 'General Review Session',
      participants: [
        { name: 'Nnenna Oyekachi' },
        { name: 'User 2' },
        { name: 'User 3' },
        { name: 'User 4' }
      ]
    },
    {
      id: '3',
      date: {
        day: 'Mon',
        dayOfMonth: 30
      },
      time: '09:00-09:30',
      sessionType: 'Resume Review Session',
      title: 'Resume Review Session',
      participants: [
        { name: 'Usman Sani' }
      ]
    },
    {
      id: '4',
      date: {
        day: 'Wed',
        dayOfMonth: 2,
        month: 'March'
      },
      time: '09:00-09:30',
      sessionType: 'General Review Session',
      title: 'General Review Session',
      participants: [
        { name: 'Nnenna Oyekachi' }
      ]
    },
    {
      id: '5',
      date: {
        day: 'Thu',
        dayOfMonth: 3,
        month: 'March'
      },
      time: '09:00-09:30',
      sessionType: 'Weekly Digest Session',
      title: 'General Review Session',
      participants: [
        { name: 'Nnenna Oyekachi' },
        { name: 'User 2' },
        { name: 'User 3' }
      ]
    }
  ];

  // Sample data for other tabs (empty for now)
  const pendingSessions: SessionItem[] = [];
  const pastSessions: SessionItem[] = [];
  const cancelledSessions: SessionItem[] = [];

  // Get the appropriate sessions based on active sub-tab
  const getActiveSessions = () => {
    switch (activeSubTab) {
      case 'upcoming':
        return upcomingSessions;
      case 'pending':
        return pendingSessions;
      case 'past':
        return pastSessions;
      case 'cancelled':
        return cancelledSessions;
      default:
        return upcomingSessions;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ProfileHeader 
        title="Mentor Profile" 
        subtitle="Manage" 
        actionButtonText="Suspend Mentor" 
        onActionClick={() => console.log('Suspend mentor clicked')} 
      />

      <MentorOverviewCard 
        name={mentorData.name}
        joinDate={mentorData.joinDate}
        stats={mentorData.stats}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Information */}
        <div className="lg:col-span-1">
          <PersonalInfo 
            fullName={mentorData.personalInfo.fullName}
            email={mentorData.personalInfo.email}
            role={mentorData.personalInfo.role}
            organization={mentorData.personalInfo.organization}
            bio={mentorData.personalInfo.bio}
            socialLinks={mentorData.personalInfo.socialLinks}
          />
        </div>

        {/* Right Column - Activity Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Activity</h2>
            
            <ActivityTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />

            {activeTab === 'sessions' && (
              <>
                <SessionsSubTabs 
                  activeSubTab={activeSubTab} 
                  onSubTabChange={setActiveSubTab} 
                />
                
                <SessionsList sessions={getActiveSessions()} />
              </>
            )}

            {activeTab === 'reviews' && (
              <div className="py-4 text-center text-gray-500">
                No reviews available at this time.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
