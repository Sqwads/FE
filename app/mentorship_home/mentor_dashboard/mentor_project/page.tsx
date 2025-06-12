"use client"
import React from 'react';
import ProjectsSection from '../../componenets/ProjectsSection';
import SectionHeader from '../../componenets/SectionHeader';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { FiClock, FiCompass } from 'react-icons/fi';
import ProjectCard from '../../componenets/ProjectCard';
// import EmptyState from '../../componenets/EmptyState';
import { userWrapper } from '@/store';
import { instance } from '@/api/instance';
import { useQuery } from '@tanstack/react-query';

const MonitoringProject = () => {
       const { user } = userWrapper((state: any) => ({
    user: state.user,
  }));

  console.log(user)

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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* <ProjectsHeader/> */}
      <ProjectsSection/>

       <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader title="My Projects" icon={<FiClock size={20} />} />
          <Link href="/user-projects" className="text-blue-600 text-sm font-medium inline-flex items-center">
            See all <HiOutlineArrowRight className="ml-1" />
          </Link>
        </div>

       {/* {projectResponse?.data?.projects?.length < 1 &&
        <EmptyState 
          title="No Active Projects Yet!" 
          description="You currently don't have any active projects. Start your first project to build your portfolio, showcase your skills, and take the next step in your journey."
          actionText="Explore Project"
          actionLink="/projects"
        />
       } */}

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


        <div className="mb-8">
        <SectionHeader title="Explore Projects" icon={<FiCompass size={20} />} seeAllLink='/user-projects' showSeeAll={true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>

    </div>
  );
}

export default MonitoringProject;
