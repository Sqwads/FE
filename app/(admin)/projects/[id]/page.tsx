'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ProjectHeader from '../components/ProjectHeader';
import NavigationTabs from '../components/NavigationTabs';
import Timeline from '../components/Timeline';
import SkillsRequired from '../components/SkillsRequired';
import UsersChart from '../components/UsersChart';
import ProjectDescription from './tabs/ProjectDescription';
import timelineImg from "../../../../public/images/timeline.png"
import Members from './tabs/members';
import { useParams, useSearchParams } from 'next/navigation';
import { instance } from '@/src/api/instance';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

const ProjectView: React.FC = () => {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('Description');

  const params = useParams()
  const projectId = params.id

  
  const {data: fetchedProject} = useQuery({
      queryFn: ()=>instance.get(`/project/${projectId}`),
      queryKey: ['projects', projectId],
      enabled: !!projectId
  })

  const getTimeDifference = (startDateString: string, endDateString: string) => {
    const startDate = moment(startDateString); // Convert to Moment.js date
    const endDate = moment(endDateString); // Get today's date

    const isFuture = startDate.isAfter(endDate, "day"); // Check if the date is in the future

    const monthsDiff = Math.abs(endDate.diff(startDate, "months"));
    const weeksDiff = Math.abs(endDate.diff(startDate, "weeks"));
    const daysDiff = Math.abs(endDate.diff(startDate, "days"));

    let timeDifference;
    
    if (monthsDiff >= 1) {
        timeDifference = `${monthsDiff} month${monthsDiff > 1 ? "s" : ""}`;
    } else if (weeksDiff >= 1) {
        timeDifference = `${weeksDiff} week${weeksDiff > 1 ? "s" : ""}`;
    } else {
        timeDifference = `${daysDiff} day${daysDiff > 1 ? "s" : ""}`;
    }

    return timeDifference
  };

  const getDayDifference = (startDateString: string, endDateString: string)=>{
    const startDate = moment(startDateString); // Convert to Moment.js date
    const endDate = moment(endDateString); // Get today's date
    const todayDate = moment()

    

    const endDay = Math.abs(endDate.diff(startDate, "days"));
    const currentDay =  Math.abs(todayDate.diff(startDate, "days"));

   

    return{
      endDay,
      currentDay
    }
  }
 
  const projectData = {
    title: 'Weather Forecast App',
    subtitle: 'Design a Weather Forecast Application for the Nigeria National Space Research and Development Agency (NASRDA)',
    projectType: 'UI/UX DESIGN PROJECT',
    duration: '4 WEEKS DURATION',
    timeline: {
      startDate: '25th January, 2025. Saturday',
      endDate: '25th February, 2025. Saturday',
    },
    overview: 'A client has requested a mobile app designed to provide users with accurate and user-friendly weather forecasts. Whether one is planning a weekend getaway, commuting to work, or simply curious about the day\'s weather, the goal is to create an intuitive and visually appealing experience that keeps users informed and prepared.',
    features: [
      {
        title: 'Simplicity and Clarity',
        description: 'The app\'s interface will be clean and uncluttered, focusing on essential weather information. Users can quickly access current conditions, hourly forecasts, and extended outlooks.'
      },
      {
        title: 'Location-Based Forecasting',
        description: 'Upon opening the app, users will see the weather for their current location. They can also search for other cities or save favorite locations for easy access.'
      },
      {
        title: 'Visual Delight',
        description: 'Weather icons, animations, and background imagery will reflect real-world conditions (e.g., sunny skies, rain, snow). Subtle animations will enhance the overall experience without overwhelming users.'
      },
      {
        title: 'Design Inspiration',
        description: 'Imagine a sunrise-themed color palette—soft oranges, blues, and grays—evoking the changing sky. The app\'s typography will be legible and modern, with playful accents for weather conditions (e.g., windy, cloudy). We\'ll prioritize accessibility, ensuring that everyone, regardless of ability, can access vital weather information.'
      }
    ],
    skills: [
      { name: 'Adobe XD', color: 'blue' },
      { name: 'UI Design', color: 'pink' },
      { name: 'Figma', color: 'green' },
      { name: 'Sketch', color: 'blue' },
      { name: 'HTML', color: 'blue' },
      { name: 'CSS', color: 'blue' },
      { name: 'JavaScript', color: 'blue' },
      { name: 'Git', color: 'blue' },
      { name: 'Trello', color: 'pink' },
      { name: 'Jira', color: 'green' },
      { name: 'User Flow', color: 'blue' },
      { name: 'Product', color: 'blue' }
    ],
    users: [
      { role: 'Product Design', count: 4, color: '#38428D' },
      { role: 'Front-end dev', count: 4, color: '#207194' },
      { role: 'Back-end dev', count: 2, color: '#8F1D16' },
      { role: 'Product Mgt', count: 2, color: '#88286B' }
    ],
    totalUsers: 12
  };

  

  return (
    <div className={`lg:flex gap-0 py-6 w-full min-h-screen `}>

      <div className="flex-1 lg:px-6 px-5 lg:pr-6 lg:border-r border-gray-200">
        <div className="rounded-2xl lg:px-6 py-6">
  
          <ProjectHeader 
            title={fetchedProject?.data?.name}
            subtitle={fetchedProject?.data?.description}
            projectType={`${fetchedProject?.data?.skills[0]?.name} ${fetchedProject?.data?.skills[1]?.name} Project  `}
            duration={`${getTimeDifference(fetchedProject?.data?.startDate, fetchedProject?.data?.endDate)}`}
          />
          
          <NavigationTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
    
          {activeTab === 'Description' && (
            <ProjectDescription 
              overview={fetchedProject?.data?.overview}
              features={fetchedProject?.data?.features}
              currentDay={getDayDifference(fetchedProject?.data?.startDate, fetchedProject?.data?.endDate).currentDay}
              endDay={getDayDifference(fetchedProject?.data?.startDate, fetchedProject?.data?.endDate).endDay}
            />
          )}
          
          {activeTab === 'Members' && (
            <Members
              members={fetchedProject?.data?.teamMembers}
            />
          )}
          
          {activeTab === 'Discussion' && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Discussion</h2>
              <p className="text-gray-400 mt-4">No discussion yet.</p>
            </div>
          )}
        </div>
      </div>

      <div className={`space-y-0  w-[300px] sticky top-5  ${activeTab === 'Description'?'block':'hidden'}`}>

        <div className="flex justify-end mb-4">
          <button className="flex items-center text-sm cursor-not-allowed gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
            </svg>
            Archive Project
          </button>
        </div>
        
        {/* Project Image */}
        <div className="rounded-2xl p-6">
          <div className="w-full h-48 relative rounded-lg overflow-hidden">
            <Image 
              src={fetchedProject?.data?.coverImage || '/images/proj-placeholder.jpg'}
              alt='timeline'
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Horizontal Divider */}
        <hr className="border-gray-200 my-6" />
        
        {/* Timeline Section */}
        <Timeline 
          startDate={moment(fetchedProject?.data?.startDate as string).format('dddd, MMMM Do YYYY')}
          endDate={moment(fetchedProject?.data?.endDate as string).format('dddd, MMMM Do YYYY')}
        />
        
        {/* Horizontal Divider */}
        <hr className="border-gray-200 my-6" />

        <SkillsRequired 
          skills={fetchedProject?.data?.skills}
          onEdit={() => console.log('Edit skills')}
        />
        
      
        <hr className="border-gray-200 my-6" />
        
        {/* Users Chart Section */}
        <UsersChart 
          users={fetchedProject?.data?.teamMembers || []}
          totalUsers={projectData.totalUsers}
          onEdit={() => console.log('Edit users')}
        />
      </div>
    </div>
  );
};

export default ProjectView;
