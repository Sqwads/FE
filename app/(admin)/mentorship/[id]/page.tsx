'use client';

import React, { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import MentorOverviewCard from '../components/MentorOverviewCard';
import PersonalInfo from '../components/PersonalInfo';
import ActivityTabs from '../components/ActivityTabs';
import SessionsSubTabs from '../components/SessionsSubTabs';
import SessionsList, { SessionItem } from '../components/SessionsList';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import moment from 'moment';

const MentorProfile: React.FC = () => {
  const params = useParams()
  const mentorId = params.id

  const { data: response, isPending } = useQuery({
    queryFn: () => instance.get(`/mentors/${mentorId}`),
    queryKey: ['mentor', mentorId],
    enabled: !!mentorId
  });

  const trimText = (email: string) => {
    if (!email) return null;
    const [localPart, domain] = email?.split('@');
    return localPart.length > 5 ? `${localPart.slice(0, 5)}...@${domain}` : email;
  };

  const mentor = response?.data?.data;

  const [activeTab, setActiveTab] = useState<'sessions' | 'reviews'>('sessions');
  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'pending' | 'past' | 'cancelled'>('upcoming');

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

  const pendingSessions: SessionItem[] = [];
  const pastSessions: SessionItem[] = [];
  const cancelledSessions: SessionItem[] = [];

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

  const getSocialLinks = (mentor: any) => {
    if (!mentor) return undefined;
    
    console.log('Mentor social links data:', {
      linkedin_url: mentor.linkedin_url,
      linkedln_url: mentor.linkedln_url,
      facebook_url: mentor.facebook_url,
      twitter_url: mentor.twitter_url
    });
    
    const socialLinks: any = {};
    
    // Only add social links that have valid URLs
    if (mentor.linkedin_url || mentor.linkedln_url) {
      socialLinks.linkedin = mentor.linkedin_url || mentor.linkedln_url;
    }
    if (mentor.facebook_url) {
      socialLinks.facebook = mentor.facebook_url;
    }
    if (mentor.twitter_url) {
      socialLinks.twitter = mentor.twitter_url;
    }
    
    console.log('Processed social links:', socialLinks);
    
    return Object.keys(socialLinks).length > 0 ? socialLinks : undefined;
  };

  return (
    <div className="lg:px-6 px-3 py-6 bg-gray-50 min-h-screen">
      <ProfileHeader 
        title="Mentor Profile" 
        subtitle="Manage" 
        actionButtonText="Suspend Mentor" 
        onActionClick={() => console.log('Suspend mentor clicked')} 
      />

      <MentorOverviewCard 
        name={`${mentor?.firstName} ${mentor?.lastName}`}
        joinDate={moment(mentor?.created_at as string).format('MMMM Do YYYY').toUpperCase()}
        stats={{
          sessions: 0,
          rating: '5.0',
          duration: '0 Hours',
          email: trimText(mentor?.email || ''),
          lastSession: 'N/A'
        }}
        avatarUrl={mentor?.profileImage}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Information */}
        <div className="lg:col-span-1">
          <PersonalInfo 
            fullName={`${mentor?.firstName} ${mentor?.lastName}`}
            email={mentor?.email}
            role={mentor?.title}
            organization={mentor?.company}
            bio={mentor?.bio}
            socialLinks={getSocialLinks(mentor)}
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