"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import { HiOutlineArrowRight } from 'react-icons/hi';
import Image from 'next/image';

// Components
import ProjectHeader from '../../components/ProjectHeader';
import NavigationTabs from '../../components/NavigationTabs';
import ProjectTimeline from '../../components/ProjectTimeline';
import ProjectSidebar from '../../components/ProjectSidebar';
import DiscussionTabContent from '../../components/DiscussionTabContent';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import { getDayDifference, getTimeDifference } from '@/common';

function ProjectDetailsContent() {
  const [activeTab, setActiveTab] = useState('Description');
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null); // Changed to any
  const params = useParams()
  const projectId = params.projectId


  const [projectData, setProjectData] = useState<any>({
    id: '',
    title: '',
    type: '',
    duration: '',
    description: '',
    startDay: 0,
    endDay: 0,
    daysLeft: 0,
    overview: '',
    keyFeatures: [],
    skills: [],
    participants: [],
    additionalParticipants: 0
  });

  const {data: fetchedProject} = useQuery({
      queryFn: ()=>instance.get(`/project/${projectId}`),
      queryKey: ['projects', projectId],
      enabled: !!projectId
  })

  useEffect(() => {
    // Simulate API fetch
    const fetchProjectData = async () => {
      try {
        // Using mock data for now
        const mockData: any = {
          id:  '1',
          title: 'Weather Forecast App',
          type: 'UX/UI DESIGN PROJECT',
          duration: '3 WEEKS DURATION',
          description: 'Design a Weather Forecast Application for the Nigeria National Space Research and Development Agency (NASRDA)',
          image: '/images/weather_1.png',
          startDay: 0,
          endDay: 21,
          daysLeft: 2,
          overview: 'A client has requested a mobile app designed to provide users with accurate and user-friendly weather forecasts.',
          keyFeatures: [
            { title: 'Simplicity and Clarity', description: 'The app\'s interface will be clean and uncluttered.' },
            { title: 'Location-Based Forecasting', description: 'Users will see weather for their current location.' }
          ],
          skills: [
            { name: 'Xd', icon: 'Xd' },
            { name: 'Figma', icon: 'Fi' }
          ],
          participants: [
            { name: 'Michael Jordan', role: 'Project Lead', image: '/images/woman_av.png' },
            { name: 'Chuku Mike', role: '', image: '/images/woman_av.png' }
          ],
          additionalParticipants: 12
        };

        setProjectData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load project data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProjectData();
  }, [params.projectId]);

  const handleButtonClick = () => {
    setIsMember(!isMember);
    console.log(isMember ? 'Leaving project...' : 'Joining project...');
  };

  

  return (
    <div className="px-4 lg:px-8 py-14">
      {/* Back Navigation */}
      <div className="mb-4">
        <Link href="/user-projects" className="text-blue-600 text-sm font-medium inline-flex items-center">
          <FiArrowLeft className="mr-1" /> Back to Projects
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Column */}
        <div className="lg:w-2/3">
          {/* Project Header & Join Button */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <ProjectHeader
                title={fetchedProject?.data?.name}
                type={`${fetchedProject?.data?.skills[0]?.name} ${fetchedProject?.data?.skills[1]?.name} Project  `}
                duration={`${getTimeDifference(fetchedProject?.data?.startDate, fetchedProject?.data?.endDate)}`}
                description={fetchedProject?.data?.description}
              />
              <div className="mt-4 md:mt-0 flex-shrink-0">
                <button
                  onClick={handleButtonClick}
                  className={`${isMember ? 'bg-red-600 cursor-not-allowed hover:bg-red-700' : 'bg-blue-900 cursor-not-allowed hover:bg-blue-800'} text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200 text-sm sm:text-base`}
                >
                  Leave Project
                  {/* {isMember ? 'Leave Project' : 'Join Project'}
                  L
                  {isMember ? <FiX className="ml-2" /> : <HiOutlineArrowRight className="ml-2" />} */}
                </button>
              </div>
            </div>
          </div>

          <NavigationTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={['Description', 'Timelines', 'Discussion', 'Members']}
          />

          {/* Tab Content */}
          {activeTab === 'Description' && (
            <div>
              <ProjectTimeline 
                  currentDay={getDayDifference(fetchedProject?.data?.startDate, fetchedProject?.data?.endDate).currentDay} 
                  endDay={getDayDifference(fetchedProject?.data?.startDate, fetchedProject?.data?.endDate).endDay}
                />
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <div className="mb-6">
                <h3 className="font-medium mb-2">Project Overview</h3>
                <p className="text-gray-700 mb-4 whitespace-pre-line">{fetchedProject?.data?.description}</p>
              </div>
              <div>
                <h3 className="font-medium mb-3">Key Features and Design Goals</h3>
               {fetchedProject?.data?.features}
              </div>
            </div>
          )}

          {activeTab === 'Timelines' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Timelines</h2>
              <p className="text-gray-700">Detailed project timeline information would appear here.</p>
            </div>
          )}

          {activeTab === 'Discussion' && <DiscussionTabContent />}

          {activeTab === 'Members' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Members</h2>
              <p className="text-gray-700">Detailed information about project members would appear here.</p>
            </div>
          )}
        </div>

        <ProjectSidebar
          image={fetchedProject?.data?.coverImage}
          title={projectData.title}
          daysLeft={projectData.daysLeft}
          skills={fetchedProject?.data?.skills?.flatMap((item:any)=> item?.tools).slice(0,3)|| []}
          participants={fetchedProject?.data?.teamMembers}
          additionalParticipants={projectData.additionalParticipants}
        />
      </div>
    </div>
  );
}

export default function ProjectDetailsPage(props: any) {
  return (
    <ErrorBoundary>
      <ProjectDetailsContent {...props} />
    </ErrorBoundary>
  );
}