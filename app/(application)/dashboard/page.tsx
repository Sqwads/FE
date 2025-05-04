"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { userWrapper } from '@/store';
import { FiClock, FiCompass, FiStar } from 'react-icons/fi';
import { BsCircleFill } from 'react-icons/bs';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { MdOutlineWavingHand } from 'react-icons/md';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

// Import components
import StatusCard from '../components/StatusCard';
import ActionCard from '../components/ActionCard';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';

export default function DashboardPage() {
  const { user } = userWrapper((state) => ({
    user: state.user,
  }));

  // Sample data for projects
  const exploreProjects = [
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
  const topProjects = [...exploreProjects];

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          Great to see you again, {user?.firstName || 'User'}!{' '}
          <MdOutlineWavingHand className="ml-2 text-yellow-400" />
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          "The only way to do great work is to love what you do."
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Link href="/dashboard/projects" className="block">
          <StatusCard 
            title="MY PROJECTS" 
            count={0} 
            description="You currently don't have any active projects. Explore projects!" 
            bgColor="bg-indigo-500"
            icon={<IoPersonCircleOutline size={24} />}
          />
        </Link>
        <StatusCard 
          title="COMPLETED PROJECTS" 
          count={0} 
          description="No completed projects yet. Finish one to build your portfolio!" 
          bgColor="bg-cyan-500"
          icon={<IoPersonCircleOutline size={24} />}
        />
        <StatusCard 
          title="UPCOMING DEADLINES" 
          count={0} 
          description="No upcoming deadlines. Stay on track by marking your tasks and planning ahead!" 
          bgColor="bg-pink-500"
          icon={<IoPersonCircleOutline size={24} />}
        />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ActionCard 
          title="Finish Setting Up Your Profile" 
          description="You're almost there! Just a few more details to set up a profile you love."
          icon={<BsCircleFill className="text-blue-600" size={12} />}
          progress={30}
        />
        <ActionCard 
          title="Connect with Mentors" 
          description="You're almost there! Just a few more details to set up a profile you love."
          illustration="/images/connect.png"
          actionLink="/mentors"
          actionText="Get Started here"
        />
      </div>

      {/* My Projects Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader title="My Projects" icon={<FiClock size={20} />} />
          <Link href="/dashboard/projects" className="text-blue-600 text-sm font-medium inline-flex items-center">
            See all <HiOutlineArrowRight className="ml-1" />
          </Link>
        </div>
        <EmptyState 
          title="No Active Projects Yet!" 
          description="You currently don't have any active projects. Start your first project to build your portfolio, showcase your skills, and take the next step in your journey."
          actionText="Explore Project"
          actionLink="/projects"
        />
      </div>

      {/* Explore Projects Section */}
      <div className="mb-8">
        <SectionHeader title="Explore Projects" icon={<FiCompass size={20} />} showSeeAll={true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>

      {/* Top Projects Section */}
      <div className="mb-8">
        <SectionHeader title="Top Projects for you" icon={<FiStar size={20} />} showSeeAll={true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
