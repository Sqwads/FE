"use client";

import React, { useState } from 'react';
import { userWrapper } from '@/store';
import { FiClock, FiCompass, FiStar, FiArrowLeft } from 'react-icons/fi';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { MdOutlineWavingHand } from 'react-icons/md';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

// Import components
import StatusCard from '../components/StatusCard';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import ActiveProjectCard from '../components/ActiveProjectCard';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import { PiWarningOctagonFill } from 'react-icons/pi';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import EmptyState from '../components/EmptyState';

export default function MyProjectsPage() {
  const { user } = userWrapper((state: any) => ({
    user: state.user,
  }));

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const { data: response, isLoading } = useQuery({
    queryFn: () => instance.get('/analytics/user'), // Replace with your API endpoint
    queryKey: ['project-analytics'],
  });

  const { data: projectResponse, isLoading: projectIsLoading } = useQuery({ 
      queryFn: () => instance.get('/project/all', {
        params: { 
          userId: user?._id ,
          pageSize,
          page
        },
    }), 
      queryKey: ['projects'],
       enabled: !!user?._id
    });

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
        <h1 className="lg:text-3xl text-2xl flex items-center">
          Great to see you again, {user?.firstName || 'Yusuf'}!{' '}
          <MdOutlineWavingHand className="ml-2 text-yellow-400" />
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          "The only way to do great work is to love what you do."
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-2 lg:gap-y-6 mb-10">
        <Link href="/user-projects" className="block">
          <StatusCard 
            title="MY PROJECTS" 
            count={response?.data?.data?.totalProjects || 0} 
            description={
                response?.data?.data?.totalProjects > 0 ? 
                `You are currently working on ${ response?.data?.data?.totalProjects} projects. Stay focused and track your progress! ⚡️` : 
                `You currently don't have any active projects. Explore projects!`
            } 
            bgColor="bg-indigo-500"
            icon={<FaClock color='#6172F3' size={20} />}
            iconBgColor='#DADEFF'
          />
        </Link>
        <StatusCard 
          title="COMPLETED PROJECTS" 
          count={response?.data?.data?.totalCompletedProjects || 0} 
          description={
            response?.data?.data?.totalCompletedProjects > 0 ? 
            `Well done! You've successfully completed ${response?.data?.data?.totalCompletedProjects} projects so far. 🥰` : 
            `No completed projects yet. Start your first project to build your portfolio!`
          }
          bgColor="bg-cyan-500"
          icon={<FaCheckCircle color='#36BFFA' size={24} />}
          iconBgColor='#C7EEFF'
        />
        <StatusCard 
          title="ONGOING PROJECTS" 
          count={response?.data?.data?.totalInProgressProjects || 0} 
          description={
            response?.data?.data?.totalInProgressProjects > 0 ? 
            `You have ${response?.data?.data?.totalInProgressProjects} projects due in ! Stay on track and finish them on time. Well-done 👏` : 
            `No ongoing projects yet. Start your first project to build your portfolio!`  
          }
          bgColor="bg-pink-500"
          icon={<PiWarningOctagonFill color='#EE46BC' size={24} />}
          iconBgColor='#FFE7F8'
        />
      </div>

      {/* My Projects Section */}
      <div className="mb-8">

        {projectResponse?.data?.projects?.length < 1 &&
            <EmptyState 
              title="No Active Projects Yet!" 
              description="You currently don't have any active projects. Start your first project to build your portfolio, showcase your skills, and take the next step in your journey."
              actionText="Explore Project"
              actionLink="/projects"
            />
        }

        <div className="flex items-center justify-between mb-4">
          <SectionHeader title="My Projects" icon={<FiClock size={20} />} />
        </div>
        
        {/* Changed from space-y-4 to grid layout to match the original design */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProjects.map((project: any, index: any) => (
            <ActiveProjectCard key={index} {...project} />
          ))}
        </div> */}

         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {projectResponse?.data?.projects?.map((item:any, idx:number)=>
              <ProjectCard 
                showProgress={true}
                completionPercentage={item?.completionPercentage || 20}
                key={idx} 
                projectId={item?._id}
                image={item?.coverImage}
                title={item?.name}
                description = {item?.description}
                tags ={item?.skills?.flatMap((item:any)=> item?.tools).slice(0,3)|| []}
                collaborators = {item?.teamMembers?.map((member:any)=> member?.user) }
              />
          )}
        </div>
      </div>

      {/* Explore Projects Section */}
      {/* <div className="mb-8">
        <SectionHeader title="Explore Projects" icon={<FiCompass size={20} />} showSeeAll={true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreProjects.map((project: any, index: any) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div> */}

      {/* Top Projects Section */}
      {/* <div className="mb-8">
        <SectionHeader title="Top Projects for you" icon={<FiStar size={20} />} showSeeAll={true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProjects.map((project: any, index: any) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div> */}
    </div>
  );
}