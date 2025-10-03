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
import ReviewList from '@/app/(application)/mentors/components/review';

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

  // REMOVED ALL DUMMY DATA - Will use real API data
  const upcomingSessions: SessionItem[] = [];
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
    
    const socialLinks: any = {};
    
    if (mentor.linkedin_url || mentor.linkedln_url) {
      socialLinks.linkedin = mentor.linkedin_url || mentor.linkedln_url;
    }
    if (mentor.facebook_url) {
      socialLinks.facebook = mentor.facebook_url;
    }
    if (mentor.twitter_url) {
      socialLinks.twitter = mentor.twitter_url;
    }
    
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
              <ReviewList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;