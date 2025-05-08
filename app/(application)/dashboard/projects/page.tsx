"use client";

import React from 'react';
import { userWrapper } from '@/store';
import { FiClock, FiCompass, FiStar, FiArrowLeft } from 'react-icons/fi';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { MdOutlineWavingHand } from 'react-icons/md';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

// Import components
import StatusCard from '../../components/StatusCard';
import SectionHeader from '../../components/SectionHeader';
import ProjectCard from '../../components/ProjectCard';
import ActiveProjectCard from '../../components/ActiveProjectCard';

export default function MyProjectsPage() {
  const { user } = userWrapper((state: any) => ({
    user: state.user,
  }));

  // Sample data for active projects
  const activeProjects: any = [
    {
      title: "Cybersecurity Awareness Tool",
      description: "Develop a tool to educate users on common cyber threats and best practices...",
      image: "/images/cyber.png",
      tags: ["Python", "Security", "Education"],
      completionPercentage: 47,
      daysRemaining: 32
    },
    {
      title: "Weather Forecast App",
      description: "Build a real-time weather app with location-based forecasts, dynamic updates, and weather alerts tailored to your region.",
      image: "/images/weather_1.png",
      tags: ["React", "API", "CSS"],
      completionPercentage: 14,
      daysRemaining: 18
    },
    {
      title: "Data Insights Dashboard",
      description: "Create a dashboard to visualize trends and key metrics from datasets...",
      image: "/images/data_dash.png",
      tags: ["Tableau", "SQL", "Data Visualization"],
      completionPercentage: 88,
      daysRemaining: 4
    }
  ];

  // Sample data for explore projects
  const exploreProjects: any = [
    {
      title: "Kilan Portfolio Website",
      description: "Build a responsive portfolio website to show your projects and skills while learning...",
      image: "/images/kilan.png",
      tags: ["HTML", "CSS", "JavaScript"],
      duration: "3 weeks",
      collaborators: 4
    },
    {
      title: "Weather Forecast App",
      description: "Build a real-time weather app with location-based forecasts...",
      image: "/images/weather_1.png",
      tags: ["React", "API", "CSS"],
      duration: "2 month",
      collaborators: 3
    },
    {
      title: "Cybersecurity Tool",
      description: "Develop a tool to educate users on common cyber threats and best practices...",
      image: "/images/cyber.png",
      tags: ["Python", "Security", "Education"],
      duration: "3 month",
      collaborators: 3
    },
    {
      title: "Data Insights Dashboard",
      description: "Create a dashboard to visualize trends and key metrics from datasets...",
      image: "/images/data_dash.png",
      tags: ["Tableau", "SQL", "Analytics"],
      duration: "3 weeks",
      collaborators: 4
    }
  ];

  // Duplicate for top projects
  const topProjects: any = [...exploreProjects];

  return (
    <div className="p-6">
      {/* Back to Dashboard Link */}
      <div className="mb-4">
        <Link href="/dashboard" className="text-blue-600 text-sm font-medium inline-flex items-center">
          <FiArrowLeft className="mr-1" /> Back to Dashboard
        </Link>
      </div>

      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          Great to see you again, {user?.firstName || 'Yusuf'}!{' '}
          <MdOutlineWavingHand className="ml-2 text-yellow-400" />
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          "The only way to do great work is to love what you do."
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatusCard 
          title="MY PROJECTS" 
          count={3} 
          description="You are currently working on 3 projects. Stay focused and track your progress!" 
          bgColor="bg-indigo-500"
          icon={<IoPersonCircleOutline size={24} />}
        />
        <StatusCard 
          title="COMPLETED PROJECTS" 
          count={7} 
          description="You have successfully completed 7 projects so far!" 
          bgColor="bg-cyan-500"
          icon={<IoPersonCircleOutline size={24} />}
        />
        <StatusCard 
          title="UPCOMING DEADLINES" 
          count={2} 
          description="You have 2 projects due in 7 days! Stay on track and finish them on time, well done." 
          bgColor="bg-pink-500"
          icon={<IoPersonCircleOutline size={24} />}
        />
      </div>

      {/* My Projects Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader title="My Projects" icon={<FiClock size={20} />} />
          <Link href="#" className="text-blue-600 text-sm font-medium inline-flex items-center">
            See all <HiOutlineArrowRight className="ml-1" />
          </Link>
        </div>
        
        {/* Changed from space-y-4 to grid layout to match the original design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProjects.map((project: any, index: any) => (
            <ActiveProjectCard key={index} {...project} />
          ))}
        </div>
      </div>

      {/* Explore Projects Section */}
      <div className="mb-8">
        <SectionHeader title="Explore Projects" icon={<FiCompass size={20} />} showSeeAll={true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreProjects.map((project: any, index: any) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>

      {/* Top Projects Section */}
      <div className="mb-8">
        <SectionHeader title="Top Projects for you" icon={<FiStar size={20} />} showSeeAll={true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProjects.map((project: any, index: any) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}