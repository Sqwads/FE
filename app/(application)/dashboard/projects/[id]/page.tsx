"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiClock, FiAlertTriangle, FiX } from 'react-icons/fi';
import { HiOutlineArrowRight } from 'react-icons/hi';

// Define TypeScript interfaces for component props
interface ProjectHeaderProps {
  title: string;
  type: string;
  duration: string;
  description: string;
  image?: string;
}

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface ProjectTimelineProps {
  startDay: number;
  endDay: number;
}

interface SkillBadgeProps {
  name: string;
  icon: React.ReactNode | string;
}

interface ParticipantCardProps {
  name: string;
  role: string;
  image?: string;
}

interface AlertNotificationProps {
  message: string;
  daysLeft: number;
}

interface KeyFeature {
  title: string;
  description: string;
}

interface Skill {
  name: string;
  icon: string;
}

interface Participant {
  name: string;
  role: string;
  image?: string;
}

interface ProjectData {
  id: string;
  title: string;
  type: string;
  duration: string;
  description: string;
  image?: string;
  startDay: number;
  endDay: number;
  daysLeft: number;
  overview: string;
  keyFeatures: KeyFeature[];
  skills: Skill[];
  participants: Participant[];
  additionalParticipants: number;
}

// Create components for the project details page
const ProjectHeader: React.FC<ProjectHeaderProps> = ({ title, type, duration, description, image }) => {
  return (
    <div className="relative bg-white rounded-lg mb-6">
      <div className="flex flex-col">
        <div className="mb-4">
          <div className="text-xs font-medium text-blue-600 uppercase mb-2">
            {type} • {duration}
          </div>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 max-w-2xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['Description', 'Timelines', 'Discussion', 'Members'];
  
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-4 px-1 ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ startDay, endDay }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-medium">Start</h3>
          <p className="text-sm text-gray-500">Day {startDay}</p>
        </div>
        <div className="text-right">
          <h3 className="font-medium">End</h3>
          <p className="text-sm text-gray-500">Day {endDay}</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
      </div>
    </div>
  );
};

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, icon }) => {
  return (
    <div className="flex flex-col items-center mr-6">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
        {typeof icon === 'string' ? icon : icon}
      </div>
      <span className="text-sm">{name}</span>
    </div>
  );
};

const ParticipantCard: React.FC<ParticipantCardProps> = ({ name, role, image }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
        {image ? (
          <Image src={image} alt={name} width={40} height={40} className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <h4 className="font-medium">{name}</h4>
        {role && <p className="text-sm text-blue-600">{role}</p>}
      </div>
    </div>
  );
};

const AlertNotification: React.FC<AlertNotificationProps> = ({ message, daysLeft }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-6 relative">
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => setIsVisible(false)}
      >
        <FiX size={18} />
      </button>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <FiAlertTriangle className="text-orange-500" />
          </div>
        </div>
        <div>
          <h3 className="font-medium">Upcoming Deadline Alert!</h3>
          <p className="text-sm text-gray-600">
            Your project is due in <span className="font-medium">{daysLeft} days</span>. Kindly review and finalize tasks to stay on track.
          </p>
        </div>
      </div>
    </div>
  );
};

interface PageProps {
  params: {
    projectId?: string;
  };
}

export default function ProjectDetailsPage({ params }: PageProps) {
  const [activeTab, setActiveTab] = useState('Description');
  // Simulate user membership status - in a real app, this would come from API/context
  const [isMember, setIsMember] = useState(false); // Set to true to see the "Leave Project" button
  
  // This would normally come from an API call using the projectId
  const projectData: ProjectData = {
    id: params?.projectId || '1',
    title: 'Weather Forecast App',
    type: 'UX/UI DESIGN PROJECT',
    duration: '3 WEEKS DURATION',
    description: 'Design a Weather Forecast Application for the Nigeria National Space Research and Development Agency (NASRDA)',
    image: '/images/weather_1.jpg',
    startDay: 0,
    endDay: 21,
    daysLeft: 2,
    overview: 'A client has requested a mobile app designed to provide users with accurate and user-friendly weather forecasts. Whether one is planning a weekend getaway, commuting to work, or simply curious about the day\'s weather, the goal is to create an intuitive and visually appealing experience that keeps users informed and prepared.',
    keyFeatures: [
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
      { name: 'Xd', icon: 'Xd' },
      { name: 'Figma', icon: 'Figma' }
    ],
    participants: [
      { name: 'Michael Jordan', role: 'Project Lead', image: '/images/avatar1.jpg' },
      { name: 'Chuku Mike', role: '', image: '/images/avatar2.jpg' },
      { name: 'Kunle Adebayo', role: '', image: '/images/avatar3.jpg' }
    ],
    additionalParticipants: 12
  };

  // Function to handle joining/leaving (placeholder)
  const handleButtonClick = () => {
    // In a real app, this would trigger an API call to join or leave
    setIsMember(!isMember);
    console.log(isMember ? 'Leaving project...' : 'Joining project...');
  };

  return (
    <div className="p-6">
      {/* Back Navigation */}
      <div className="mb-4">
        <Link href="/dashboard/projects" className="text-blue-600 text-sm font-medium inline-flex items-center">
          <FiArrowLeft className="mr-1" /> Back to Projects
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Column (Left) - 2/3 width */}
        <div className="lg:w-2/3">
          {/* Project Header */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <ProjectHeader 
                title={projectData.title}
                type={projectData.type}
                duration={projectData.duration}
                description={projectData.description}
                image={projectData.image}
              />
              
              {/* Conditional Button */}
              <div className="mt-4 md:mt-0">
                {isMember ? (
                  <button 
                    onClick={handleButtonClick}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    Leave Project <FiX className="ml-2" />
                  </button>
                ) : (
                  <button 
                    onClick={handleButtonClick}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    Join Project <HiOutlineArrowRight className="ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Timeline */}
          <ProjectTimeline startDay={projectData.startDay} endDay={projectData.endDay} />

          {/* Description Content */}
          {activeTab === 'Description' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Description</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Project Overview</h3>
                <p className="text-gray-700 mb-4">{projectData.overview}</p>
              </div>

              <div>
                <h3 className="font-medium mb-3">Key Features and Design Goals</h3>
                {projectData.keyFeatures.map((feature, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800 mb-1">• {feature.title}</p>
                    <p className="text-gray-700 pl-4">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Tab Contents (placeholder) */}
          {activeTab === 'Timelines' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Timelines</h2>
              <p className="text-gray-700">Detailed project timeline information would appear here.</p>
            </div>
          )}

          {activeTab === 'Discussion' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Discussion</h2>
              <p className="text-gray-700">Project discussion and comments would appear here.</p>
            </div>
          )}

          {activeTab === 'Members' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Members</h2>
              <p className="text-gray-700">Detailed information about project members would appear here.</p>
            </div>
          )}
        </div>

        {/* Sidebar Column (Right) - 1/3 width */}
        <div className="lg:w-1/3">
          {/* Image with Alert Overlay */}
          <div className="relative mb-6">
            {/* Placeholder for the image that the alert should overlay */}
            <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Project Image Placeholder
              </div>
            </div>
            
            {/* Alert positioned absolutely over the image */}
            <div className="absolute top-0 right-0 left-0">
              <AlertNotification message="Review and finalize tasks" daysLeft={projectData.daysLeft} />
            </div>
          </div>

          {/* Skills Required */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Skills Required</h3>
            <div className="flex">
              {projectData.skills.map((skill, index) => (
                <SkillBadge key={index} name={skill.name} icon={skill.icon} />
              ))}
            </div>
          </div>

          {/* Participants */}
          <div>
            <h3 className="text-lg font-bold mb-4">Participants</h3>
            {projectData.participants.map((participant, index) => (
              <ParticipantCard 
                key={index}
                name={participant.name}
                role={participant.role}
                image={participant.image}
              />
            ))}
            
            {projectData.additionalParticipants > 0 && (
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 text-sm">
                +{projectData.additionalParticipants}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

