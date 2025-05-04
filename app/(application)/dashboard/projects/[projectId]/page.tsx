"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import { HiOutlineArrowRight } from 'react-icons/hi';
import Image from 'next/image';

// Types
import { ProjectData, KeyFeature, Skill, Participant } from '@/types'; 

// Components
import ProjectHeader from '../../../components/ProjectHeader';
import NavigationTabs from '../../../components/NavigationTabs';
import ProjectTimeline from '../../../components/ProjectTimeline';
import ProjectSidebar from '../../../components/ProjectSidebar';
import DiscussionTabContent from '../../../components/DiscussionTabContent';
import ErrorBoundary from '../../../components/ErrorBoundary';

interface PageProps {
  params: {
    projectId: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

function ProjectDetailsContent({ params }: PageProps) {
  const [activeTab, setActiveTab] = useState('Description'); 
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with safe defaults
  const [projectData, setProjectData] = useState<ProjectData>({
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

  useEffect(() => {
    // Simulate API fetch
    const fetchProjectData = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch(`/api/projects/${params.id}`);
        // const data = await response.json();
        
        // Using mock data for now
        const mockData: ProjectData = {
          id: params?.projectId || '1',
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
            { name: 'Michael Jordan', role: 'Project Lead', image: '/images/man_avatar-2.png' },
            { name: 'Chuku Mike', role: '', image: '/images/woman_avatar-3.png' }
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

  if (loading) {
    return <div className="p-6 text-center">Loading project details...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Back Navigation */}
      <div className="mb-4">
        <Link href="/dashboard/projects" className="text-blue-600 text-sm font-medium inline-flex items-center">
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
                title={projectData.title}
                type={projectData.type}
                duration={projectData.duration}
                description={projectData.description}
              />
              <div className="mt-4 md:mt-0 flex-shrink-0">
                <button 
                  onClick={handleButtonClick}
                  className={`${isMember ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-900 hover:bg-blue-800'} text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200 text-sm sm:text-base`}
                >
                  {isMember ? 'Leave Project' : 'Join Project'} 
                  {isMember ? <FiX className="ml-2" /> : <HiOutlineArrowRight className="ml-2" />}
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
              <ProjectTimeline startDay={projectData.startDay} endDay={projectData.endDay} />
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <div className="mb-6">
                <h3 className="font-medium mb-2">Project Overview</h3>
                <p className="text-gray-700 mb-4 whitespace-pre-line">{projectData.overview}</p>
              </div>
              <div>
                <h3 className="font-medium mb-3">Key Features and Design Goals</h3>
                {projectData.keyFeatures.map((feature, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800 mb-1">• {feature.title}</p>
                    <p className="text-gray-700 pl-4 whitespace-pre-line">{feature.description}</p>
                  </div>
                ))}
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
          image={projectData.image}
          title={projectData.title}
          daysLeft={projectData.daysLeft}
          skills={projectData.skills}
          participants={projectData.participants}
          additionalParticipants={projectData.additionalParticipants}
        />
      </div>
    </div>
  );
}

export default function ProjectDetailsPage(props: PageProps) {
  return (
    <ErrorBoundary>
      <ProjectDetailsContent {...props} />
    </ErrorBoundary>
  );
}