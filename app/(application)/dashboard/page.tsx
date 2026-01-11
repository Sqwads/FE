"use client";

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userWrapper } from '@/store';
import { FiClock, FiCompass, FiStar, FiX,FiAlertCircle  } from 'react-icons/fi';
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
  const { user, setUser } = userWrapper((state: any) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  // Fix: Better LinkedIn validation and persistent state
  const [showLinkedInNotification, setShowLinkedInNotification] = useState(true);

  // Fetch fresh user data on component mount
  const { data: freshUserData } = useQuery({
    queryFn: () => instance.get('/user/profile'),
    queryKey: ['user-profile-dashboard'],
    enabled: true,
  });

  // Update store with fresh user data when it loads
  useEffect(() => {
    if (freshUserData?.data && setUser) {
      setUser(freshUserData.data);
    }
  }, [freshUserData, setUser]);

  // Listen for store updates from other components
  useEffect(() => {
    const handleUserProfileUpdate = () => {
      window.location.reload(); 
    };

    window.addEventListener('userProfileUpdated', handleUserProfileUpdate);
    
    return () => {
      window.removeEventListener('userProfileUpdated', handleUserProfileUpdate);
    };
  }, []);

  // LinkedIn URL validation
  const hasValidLinkedIn = () => {
    const linkedinUrl = user?.socialProfile?.linkedin;
    return linkedinUrl && 
           linkedinUrl.trim() !== '' && 
           linkedinUrl.length > 5;
  };

  // Load persisted state on component mount
  useEffect(() => {
    const notificationClosed = localStorage.getItem('linkedinNotificationClosed');
    if (notificationClosed === 'true') {
      setShowLinkedInNotification(false);
    }
  }, []);

  // Reset notification state when user updates their LinkedIn
  useEffect(() => {
    if (hasValidLinkedIn()) {
      setShowLinkedInNotification(false);
      localStorage.removeItem('linkedinNotificationClosed');
    }
  }, [user?.socialProfile?.linkedin]);

  const needsLinkedInNotification = !hasValidLinkedIn() && showLinkedInNotification;

  // Persist the closed state in localStorage
  const handleCloseNotification = () => {
    setShowLinkedInNotification(false);
    localStorage.setItem('linkedinNotificationClosed', 'true');
  };

  const handleGoToSettings = () => {
    window.location.href = '/settings';
  };

  const profile = {
    skill: user?.skills_of_interest?.length > 0,
    experience: user?.experiences?.length > 0,
    socialProfile : (!!user?.socialProfile?.twitter && !!user?.socialProfile?.linkedin ),
    location: !!user?.location
  }

  const profileFields = Object.values(profile);
  const completedFields = profileFields.filter(Boolean).length;
  const profileCompletion = Math.round((completedFields / profileFields.length) * 100);

  const [currentPage, setCurrentPage] = useState(1);

  const { data: projectResponse, isLoading: projectIsLoading } = useQuery({ 
    queryFn: () => instance.get('/project/all', {
      params: { 
        userId: user?._id ,
        pageSize: 3
      },
    }), 
    queryKey: ['user-projects'],
    enabled: !!user?._id
  });

  const { data: exploreProjectResponse, isLoading: exploreProjectIsLoading } = useQuery({ 
    queryFn: () => instance.get('/project/all', {
      params: { 
        pageNumber: currentPage,
        pageSize: 8
      },
    }), 
    queryKey: ['projects-explore', currentPage],
  });

  const { data: response, isLoading } = useQuery({
    queryFn: () => instance.get('/analytics/user'),
    queryKey: ['project-analytics'],
  });

  const totalPages = Math.ceil(exploreProjectResponse?.data?.totalNoOfRecords/8)
  const handleNextPage = ()=>{   
    if(currentPage+1 <= totalPages){
      setCurrentPage(currentPage+1)
    }
  }

  const handlePrevPage = ()=>{
    if(currentPage-1 > 0){
      setCurrentPage(currentPage-1)
    }
  }

  return (
    <div className="lg:px-8 px-3 py-14">
      {needsLinkedInNotification && (
        <div className="fixed top-12 right-4 z-50 max-w-sm bg-[#e7ddce] border border-[#FFA52F] rounded-lg shadow-lg p-4 animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-[#FFA52F1A] rounded-full flex items-center justify-center mr-2">
                    <FiAlertCircle className="text-[#FFA52F]" size={16} />
              </div>
                <h3 className="text-sm font-semibold text-[#16181B]">
                  Update Your Socials!
                </h3>
              </div>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Add your{' '}
                <button 
                  onClick={handleGoToSettings}
                  className="text-[#16181BB2] hover:text-blue-800 underline font-medium"
                >
                  Social URLs
                </button>
                {' '}now. This ensures other members can professionally vet and connect with you before project participation begins.
              </p>
              <div className="flex space-x-2">
               
              </div>
            </div>
            <button
              onClick={handleCloseNotification}
              className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      )}

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
        <Link href="/settings" className="block">
         <ActionCard 
          title="Finish Setting Up Your Profile" 
          description="You're almost there! Just a few more details to set up a profile you love."
          icon={<HiCheckBadge color='#001D69' className="text-blue-600" size={20} />}
          progress={profileCompletion}
        />
        </Link>
        <ActionCard 
          title="Connect with Mentors" 
          description="You're almost there! Just a few more details to set up a profile you love."
          illustration="/images/connect.png"
          actionLink="/mentors_explore"
          actionText="Get Started here"
        />
      </div>

      {/* My Projects Section */}
      <div className="mb-20 lg:mb-28">
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
      <div className="lg:mb-28 mb-20">
        <SectionHeader title="Explore Projects" icon={<FiCompass size={20} />} seeAllLink='/user-projects' showSeeAll={false} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:mt-10">
          {exploreProjectResponse?.data?.projects?.map((item:any, idx:number)=>
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

        <div className="flex justify-center mt-6 space-x-4">
          <button
            className={`px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-3 py-2 text-gray-600 font-semibold">
            Page {currentPage}
          </span>
          <button
            className={`px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Top Projects Section */}
      <div className="mb-8">
        <SectionHeader title="Top Projects for you" icon={<FiStar size={20} />} seeAllLink='/user-projects' showSeeAll={true} />
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
    </div>
  );
}