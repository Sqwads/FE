"use client";
import React from 'react';
import { FaChartBar, FaCheckCircle, FaUserFriends, FaExclamationTriangle } from 'react-icons/fa';
import UserActivityChart from './components/useractivitychart';
import ProjectsList from './components/projectlist';
import UsersAnalysis from './components/usersanalysis';
import MentorsList from './components/mentorslist';
import Assessments from './components/assessments';
import { userWrapper } from '@/src/store';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/src/api/instance';

// Define the type for the stats data
interface Stat {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: string;
  trendColor: string;
}

// Define the props for the StatsCard component
interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: string;
  trendColor: string;
}

// StatsCard component with typed props
const StatsCard = ({ title, value, icon, trend, trendColor }: StatsCardProps) => {
  return (
    <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-sm w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {icon}
      </div>
      <h2 className="text-2xl font-semibold mt-2">{value}</h2>
      <p className={`text-sm mt-1 ${trendColor}`}>{trend}</p>
    </div>
  );
};



// AdminDashboard component
function AdminDashboard() {

  const user = userWrapper((state) => state.user);

  const  {data: response, isLoading} = useQuery({
    queryKey: ['user-stats'],
    queryFn: () => instance.get('/analytics'),
  })

  // Stats data array
  const statsData: Stat[] = [
    {
      title: "Total Projects",
      value: response?.data?.data?.totalProjects || 0,
      icon: <FaChartBar className="text-blue-500 text-2xl" />,
      trend: "+13% Up from last week",
      trendColor: "text-green-500",
    },
    {
      title: "Completed Projects",
      value: response?.data?.data?.totalCompletedProjects || 0,
      icon: <FaCheckCircle className="text-blue-400 text-2xl" />,
      trend: "-0.8% Down from last week",
      trendColor: "text-red-500",
    },
    {
      title: "Total Mentors",
      value: 0,
      icon: <FaUserFriends className="text-pink-400 text-2xl" />,
      trend: "+13% Up from last week",
      trendColor: "text-green-500",
    },
    {
      title: "Upcoming Due Projects",
      value: response?.data?.data?.upcomingDueProjects || 0,
      icon: <FaExclamationTriangle className="text-red-500 text-2xl" />,
      trend: "-3% Down from last week",
      trendColor: "text-red-500",
    }
  ];

  return (
    <section className="md:px-6 px-3 py-6 mt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl text-[#16181B]">Welcome Back, Admin {user?.firstName}! 👋</h1>
        <p className="text-[#16181B80]">&quot;Great leadership starts with passion for what you do.</p>
      </div>

      {/* Stats Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </section>

      {/* User Activity and Projects Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <UserActivityChart />
        <ProjectsList />
      </section>

      {/* UsersAnalysis, MentorsList, and Assessments Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <UsersAnalysis />
        <MentorsList />
        <Assessments />
      </section>
    </section>
  );
}

export default AdminDashboard;