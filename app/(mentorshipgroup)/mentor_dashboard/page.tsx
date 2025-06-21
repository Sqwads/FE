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

const MentorDashboardPage = () => {
  // Sample data - replace with actual data fetching and props
  const mentorName = "Yusuf";
  const upcomingSessionsCount = 2;
  
  // State to control visibility of the profile completion card
  const [showProfileCard, setShowProfileCard] = useState(true);

  const handleDismissProfileCard = () => {
    setShowProfileCard(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area (Left/Center) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Header */}
          <WelcomeHeader mentorName={mentorName} upcomingSessionsCount={upcomingSessionsCount} />
          
          {/* Stat Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href='/mentor_project'>
            
              <StatCard 
              imageSrc="/images/completed_1.png"
              imageAlt="Completed Sessions"
              title="COMPLETED SESSIONS" 
              value={48} 
              bgColorClass="bg-white"
              textColorClass="text-gray-800"
              iconBgClass="bg-green-100"
            />
            </Link>
            
            <StatCard 
              imageSrc="/images/aggregate.png"
              imageAlt="Aggregate Reviews"
              title="AGGREGATE REVIEWS" 
              value={"4.65"} 
              unit="/5.0"
              bgColorClass="bg-blue-600" // Dark blue from UI
              textColorClass="text-white"
              iconBgClass="bg-blue-700"
            />
            <StatCard 
              imageSrc="/images/clock.png"
              imageAlt="Mentorship Hours"
              title="MENTORSHIP HOURS" 
              value={14.5} 
              unit="hr"
              bgColorClass="bg-white"
              textColorClass="text-gray-800"
              iconBgClass="bg-cyan-100"
            />
          </div>

          {/* Performance Chart */}
          <PerformanceChart />

          {/* Sessions Feed */}
          <SessionsFeed />
        </div>

        {/* Sidebar Area (Right) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Completion Card (Conditionally Rendered) */}
          {showProfileCard && (
            <ProfileCompletionCard onDismiss={handleDismissProfileCard} />
          )}
          
          {/* Calendar Sidebar */}
          <CalendarSidebar />
        </div>
      </div>
    </div>
  );
};

export default MentorDashboardPage;
