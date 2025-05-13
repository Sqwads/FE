"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { userWrapper } from '@/store';
import { FiClock, FiCompass, FiStar } from 'react-icons/fi';
import { HiCheckBadge } from "react-icons/hi2";
import { MdOutlineWavingHand } from 'react-icons/md';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

// Import components
import StatusCard from '../components/StatusCard';
import ActionCard from '../components/ActionCard';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import { PiWarningOctagonFill } from "react-icons/pi";
import { instance } from '@/api/instance';

export default function DashboardPage() {
  const { user } = userWrapper((state: any) => ({
    user: state.user,
  }));

  const { data: projectResponse, isLoading: projectIsLoading } = useQuery({ 
    queryFn: () => instance.get('/project/all', {
      params: { 
        userId: user?.id ,
        pageSize: 3
      },
    }), 
    queryKey: ['projects'],
  });

  const { data: exploreProjectResponse, isLoading: exploreProjectIsLoading } = useQuery({ 
    queryFn: () => instance.get('/project/all', {
      params: { 
        // userId: user?.id ,
        pageSize: 8
      },
    }), 
    queryKey: ['projects-explore'],
  });


 

  const { data: response, isLoading } = useQuery({
    queryFn: () => instance.get('/analytics/user'), // Replace with your API endpoint
    queryKey: ['project-analytics'],
  });

  

  return (
    <div className="lg:px-8 px-3 py-14">
      {/* Welcome Header */}
      <div className="lg:mb-10 mb-5">
        <h1 className="lg:text-3xl text-2xl  flex items-center">
          Great to see you again, {user?.firstName || 'User'}!{' '}
          <MdOutlineWavingHand className="ml-2 text-yellow-400" />
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          "The only way to do great work is to love what you do."
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-2 lg:gap-y-6 mb-6">
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

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ActionCard 
          title="Finish Setting Up Your Profile" 
          description="You're almost there! Just a few more details to set up a profile you love."
          icon={<HiCheckBadge color='#001D69' className="text-blue-600" size={20} />}
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
          <Link href="/user-projects" className="text-blue-600 text-sm font-medium inline-flex items-center">
            See all <HiOutlineArrowRight className="ml-1" />
          </Link>
        </div>

       {projectResponse?.data?.projects?.length < 1 &&
        <EmptyState 
          title="No Active Projects Yet!" 
          description="You currently don't have any active projects. Start your first project to build your portfolio, showcase your skills, and take the next step in your journey."
          actionText="Explore Project"
          actionLink="/projects"
        />
       }

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectResponse?.data?.projects?.map((item:any, idx:number)=>
            <ProjectCard 
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
      <div className="mb-8">
        <SectionHeader title="Explore Projects" icon={<FiCompass size={20} />} seeAllLink='/user-projects' showSeeAll={true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreProjectResponse?.data?.projects?.map((item:any, idx:number)=>
              <ProjectCard 
                key={idx} 
                image={item?.coverImage}
                title={item?.name}
                description = {item?.description}
                tags ={item?.skills?.flatMap((item:any)=> item?.tools).slice(0,3)|| []}
                collaborators = {item?.teamMembers?.map((member:any)=> member?.user) }
              />
          )}
        </div>
      </div>

      {/* Top Projects Section */}
      <div className="mb-8">
        <SectionHeader title="Top Projects for you" icon={<FiStar size={20} />} seeAllLink='/user-projects' showSeeAll={true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectResponse?.data?.projects?.map((item:any, idx:number)=>
            <ProjectCard 
              key={idx} 
              image={item?.coverImage}
              title={item?.name}
              description = {item?.description}
              tags ={item?.skills?.flatMap((item:any)=> item?.tools).slice(0,3)|| []}
              collaborators = {item?.teamMembers?.map((member:any)=> member?.user) }
            />
        )}
        </div>
      </div>
    </div>
  );
}