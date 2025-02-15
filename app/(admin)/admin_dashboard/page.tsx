import React from 'react';
import { FaChartBar, FaCheckCircle, FaUserFriends, FaExclamationTriangle } from 'react-icons/fa';import UserActivityChart from '../components/useractivitychart';
import ProjectsList from '../components/projectlist';

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
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
      <p className={`text-sm mt-1 ${trendColor}`}>{trend}</p>
    </div>
  );
};

// Stats data array
const statsData: Stat[] = [
  {
    title: "Total Projects",
    value: 2500,
    icon: <FaChartBar className="text-blue-500 text-2xl" />,
    trend: "+13% Up from last week",
    trendColor: "text-green-500",
  },
  {
    title: "Completed Projects",
    value: 170,
    icon: <FaCheckCircle className="text-blue-400 text-2xl" />,
    trend: "-0.8% Down from last week",
    trendColor: "text-red-500",
  },
  {
    title: "Total Mentors",
    value: 32,
    icon: <FaUserFriends className="text-pink-400 text-2xl" />,
    trend: "+13% Up from last week",
    trendColor: "text-green-500",
  },
  {
    title: "Upcoming Due Projects",
    value: 21,
    icon: <FaExclamationTriangle className="text-red-500 text-2xl" />,
    trend: "-3% Down from last week",
    trendColor: "text-red-500",
  }
];

// AdminDashboard component
function AdminDashboard() {
  return (
    <section className="p-6 mt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome Back, Admin Yusuf! 👋</h1>
        <p className="text-gray-500">&quot;Great leadership starts with passion for what you do.</p>
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
    </section>
  );
}

export default AdminDashboard;