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

  // Fetch mentor data
  const { data: response, isPending } = useQuery({
    queryFn: () => instance.get(`/mentors/${mentorId}`),
    queryKey: ['mentor', mentorId],
    enabled: !!mentorId
  });

  const { data: sessionsResponse, isLoading: sessionsLoading } = useQuery({
    queryFn: () => instance.get(`/mentors/mentor-bookings/${mentorId}`),
    queryKey: ['mentor-sessions', mentorId],
    enabled: !!mentorId,
  });

  console.log('Sessions API Response:', sessionsResponse?.data);

const transformSessionsData = (apiData: any): SessionItem[] => {
  if (!apiData?.data) return [];
  
  const getSessionType = (title: string): string => {
    const typeMap: { [key: string]: string } = {
      'another test': 'General Review Session',
      'again': 'General Review Session', 
      'want to learn': 'Weekly Digest Session',
      'Next week': 'Resume Review Session',
    };
    return typeMap[title] || title || 'Mentoring Session';
  };
  
  return apiData.data.map((session: any, index: number) => {
    const sessionDate = new Date(session.date);
    const sessionType = getSessionType(session.title);
    
    return {
      id: session._id || `session-${index}`,
      date: {
        day: sessionDate.toLocaleDateString('en-US', { weekday: 'short' }),
        dayOfMonth: sessionDate.getDate(),
        month: sessionDate.toLocaleDateString('en-US', { month: 'long' }),
      },
      time: session.time || '09:00-09:30',
      sessionType: sessionType,
      title: session.title || `Session ${index + 1}`,
      participants: session.mentee ? [{
        name: `${session.mentee.firstName} ${session.mentee.lastName}`,
        firstName: session.mentee.firstName,
        lastName: session.mentee.lastName
      }] : []
    };
  });
};

  const allSessions = sessionsResponse?.data ? transformSessionsData(sessionsResponse.data) : [];

  // Filter sessions by status
  const filterSessionsByStatus = (sessions: SessionItem[], status: string) => {
    return sessions; 
  };

  const upcomingSessions = filterSessionsByStatus(allSessions, 'upcoming');
  const pendingSessions = filterSessionsByStatus(allSessions, 'pending');
  const pastSessions = filterSessionsByStatus(allSessions, 'past');
  const cancelledSessions = filterSessionsByStatus(allSessions, 'cancelled');

  const trimText = (email: string) => {
    if (!email) return null;
    const [localPart, domain] = email?.split('@');
    return localPart.length > 5 ? `${localPart.slice(0, 5)}...@${domain}` : email;
  };

  const mentor = response?.data?.data;

  const [activeTab, setActiveTab] = useState<'sessions' | 'reviews'>('sessions');
  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'pending' | 'past' | 'cancelled'>('upcoming');

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
          sessions: allSessions.length,
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
                
                {sessionsLoading ? (
                  <div className="py-4 text-center text-gray-500">
                    Loading sessions...
                  </div>
                ) : (
                  <SessionsList sessions={getActiveSessions()} />
                )}
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