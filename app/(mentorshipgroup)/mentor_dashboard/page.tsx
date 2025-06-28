"use client";
import React, { useState } from 'react';
import WelcomeHeader from '../components/Welcome';
import StatCard from '../components/StatCards';
import PerformanceChart from '../components/PerformanceChart';
import SessionsFeed from '../components/SessionFeed';
import CalendarSidebar from '../../mentorship_home/componenets/CalendarSideBar';
import ProfileCompletionCard from '../components/ProfileCompletionCard';
import Image from 'next/image';
import Link from 'next/link';
import { IoStatsChartSharp } from 'react-icons/io5';
import { userWrapper } from '@/store';
import { instance } from '@/api/instance';
import { useQuery } from '@tanstack/react-query';

const MentorDashboardPage = () => {
   const {user} = userWrapper((state)=>({
      user: state.user
    }))

    const [selectedDate, setSelectedDate] = useState(new Date());

    const {data:response, isPending: userInfoIsLoading} = useQuery({
      queryFn: ()=>instance.get('/mentors/stats'),
      queryKey: ['mentor-sats'],
    });
    const upcomingSessionsCount = response?.data?.data?.upcomingSessions || 0;
  
    const {data:bookinsResponse, isPending: bookingIsLoading} = useQuery({
      queryFn: () => instance.get('/mentors/mentor-bookings', {
      params: {
        status: 'UPCOMING',
        date: selectedDate.toDateString(),
        limit: 4
      }
      }),
      queryKey: ['mentor-bookings', selectedDate.toISOString().slice(0, 10)],
    });
  
    const [showProfileCard, setShowProfileCard] = useState(true);
    // console.log(selectedDate.toDateString())

    const handleDismissProfileCard = () => {
      // setShowProfileCard(false);
    };


  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area (Left/Center) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Header */}
          <WelcomeHeader mentorName={user?.firstName} upcomingSessionsCount={upcomingSessionsCount} />
          
          {/* Stat Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href='#'>
            
            <StatCard 
              imageSrc="/images/completed_1.png"
              imageAlt="Completed Sessions"
              title="COMPLETED SESSIONS" 
              value={response?.data?.data?.completedSessions || 0} 
              bgColorClass="bg-white"
              textColorClass="text-gray-800"
              iconBgClass="bg-green-100"
            />
            </Link>
            
            <StatCard 
              // imageSrc="/images/aggregate.png"
              imageAlt="Aggregate Reviews"
              title="AGGREGATE REVIEWS" 
              value={"3"} 
              unit="/5.0"
              bgColorClass="bg-blue-600" // Dark blue from UI
              textColorClass="text-white"
              iconBgClass="bg-[#DADEFF]"
              icon={<IoStatsChartSharp color='#38428D' />} 
            />
            <StatCard 
              imageSrc="/images/clock.png"
              imageAlt="Mentorship Hours"
              title="UPCOMING SESSIONS" 
              value={response?.data?.data?.upcomingSessions || 0} 
              // unit="hr"
              bgColorClass="bg-white"
              textColorClass="text-gray-800"
              iconBgClass="bg-cyan-100"
            />
          </div>

          {/* Performance Chart */}
          <PerformanceChart />

          {/* Sessions Feed */}
          <SessionsFeed sessionsData={response?.data?.data?.latestUpcomingSessions || []} />
        </div>

        {/* Sidebar Area (Right) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Completion Card (Conditionally Rendered) */}
          {showProfileCard && (
            <ProfileCompletionCard onDismiss={handleDismissProfileCard} />
          )}
          
          {/* Calendar Sidebar */}
          <CalendarSidebar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            events={bookinsResponse?.data?.data || []}
           />
        </div>
      </div>
    </div>
  );
};

export default MentorDashboardPage;
