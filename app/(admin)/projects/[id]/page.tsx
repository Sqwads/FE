'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ProjectHeader from '../components/ProjectHeader';
import NavigationTabs from '../components/NavigationTabs';
import Timeline from '../components/Timeline';
import SkillsRequired from '../components/SkillsRequired';
import UsersChart from '../components/UsersChart';
import ProjectDescription from '../components/ProjectDescription';

const ProjectView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Description');

  // Sample data
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
      { role: 'Product Design', count: 4, color: 'blue' },
      { role: 'Front-end dev', count: 4, color: 'teal' },
      { role: 'Back-end dev', count: 2, color: 'red' },
      { role: 'Product Mgt', count: 2, color: 'purple' }
    ],
    totalUsers: 12
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 p-6 w-full min-h-screen bg-gray-50">

      <div className="lg:col-span-3 pr-6 lg:border-r border-gray-200">
        <div className="rounded-2xl p-6">
          {/* Project Header */}
          <ProjectHeader 
            title={projectData.title}
            subtitle={projectData.subtitle}
            projectType={projectData.projectType}
            duration={projectData.duration}
          />
          
          {/* Navigation Tabs */}
          <NavigationTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          {/* Timeline Progress (visible on left panel) */}
          <div className="mt-6">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold text-[#001D69] text-lg">Start</h2>
                <p className="text-[#16181B80]">Day 0</p>
              </div>
              <div className="text-right">
                <h2 className="font-bold text-[#16181B] text-lg">End</h2>
                <p className="text-[#16181B80]">Day 21</p>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Content based on active tab */}
          {activeTab === 'Description' && (
            <ProjectDescription 
              overview={projectData.overview}
              features={projectData.features}
            />
          )}
          
          {activeTab === 'Members' && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Members</h2>
              <p className="text-gray-600 mt-4">Members content will be displayed here.</p>
            </div>
          )}
          
          {activeTab === 'Discussion' && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Discussion</h2>
              <p className="text-gray-600 mt-4">Discussion content will be displayed here.</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-0 pl-6">

        <div className="flex justify-end mb-4">
          <button className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
            </svg>
            Archive Project
          </button>
        </div>
        
        {/* Project Image */}
        <div className="rounded-2xl p-6">
          <div className="w-full h-48 relative rounded-lg overflow-hidden">
            <Image 
              src="/images/timeline.png" 
              alt="Weather Forecast App" 
              width={60}
              height={20}
              className="w-full h-full"
            />
          </div>
        </div>
        
        {/* Horizontal Divider */}
        <hr className="border-gray-200 my-6" />
        
        {/* Timeline Section */}
        <Timeline 
          startDate={projectData.timeline.startDate}
          endDate={projectData.timeline.endDate}
        />
        
        {/* Horizontal Divider */}
        <hr className="border-gray-200 my-6" />
        
        {/* Skills Required Section */}
        <SkillsRequired 
          skills={projectData.skills}
          onEdit={() => console.log('Edit skills')}
        />
        
        {/* Horizontal Divider */}
        <hr className="border-gray-200 my-6" />
        
        {/* Users Chart Section */}
        <UsersChart 
          users={projectData.users}
          totalUsers={projectData.totalUsers}
          onEdit={() => console.log('Edit users')}
        />
      </div>
    </div>
  );
};

export default ProjectView;
