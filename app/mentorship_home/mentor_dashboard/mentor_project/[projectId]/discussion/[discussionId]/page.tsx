"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import { HiOutlineArrowRight } from 'react-icons/hi';

// Import components with absolute paths (recommended)
import ProjectHeader from '../../../../../componenets/ProjectHeader';
import NavigationTabs from '../../../../../componenets/NavigationTabs';
import ProjectSidebar from '../../../../../componenets/ProjectSidebar';
import DiscussionPost from '../../../../../componenets/DiscussionPost';
import ReactionButtons from '../../../../../componenets/ReactionButtons';
import CommentInput from '../../../../../componenets/CommentInput';

export default function DiscussionThreadPage({ params }: any) {
  // Destructure with defaults to ensure type safety
  const { projectId = '', discussionId = '' } = params;

  const [activeTab, setActiveTab] = useState('Discussion');
  const [isMember, setIsMember] = useState(false);

  // Sample data with proper typing
  const projectData: any = {
    id: projectId,
    title: 'Weather Forecast App',
    type: 'UX/UI DESIGN PROJECT',
    duration: '3 WEEKS DURATION',
    description: 'Design a Weather Forecast Application for the Nigeria National Space Research and Development Agency (NASRDA)',
    image: '/images/weather_project_cover.jpg',
    daysLeft: 2,
    skills: [
      { name: 'Xd', icon: 'Xd' },
      { name: 'Figma', icon: 'Fi' }
    ],
    participants: [
      { name: 'Michael Jordan', role: 'Project Lead', image: '/images/avatar1.jpg' },
      { name: 'Chuku Mike', role: '', image: '/images/avatar2.jpg' },
      { name: 'Kunle Adebayo', role: '', image: '/images/avatar3.jpg' }
    ],
    additionalParticipants: 12
  };

  const discussionData: any = {
    discussionId: discussionId,
    authorName: 'Adewale Adeoye',
    avatarUrl: '/images/avatar3.jpg',
    postedTime: '12 HOURS AGO',
    title: 'This Project has an official Whatsapp Group',
    content: "We're thrilled to introduce the official WhatsApp group for all current and future participants of our Sqwards platform.🎉\nWhether you're already part of a squad or eagerly waiting to join one, this group is your go-to hub for updates, discussions, and camaraderie.\n\nWhy Join?\n\nConnect: Meet fellow Sqwards members, share experiences, and collaborate.\nStay Informed: Get real-time announcements about new squads, challenges, and events.\nAsk Questions: Have a burning question? Need advice? This group is your friendly Sqwards hotline.\nCelebrate Wins: Completed a challenge? Reached a milestone? Let's celebrate together!\n🔗 Join Now: Sqwards WhatsApp Group\n\nRemember, this group is all about positivity, support, and growth. Let's build an amazing Sqwards community together!🤝\n\n🚀\n\nSee you there! ➡️",
    upvotes: 25,
    commentsCount: 20,
    reactions: [
      { emoji: '👍', count: 2 },
      { emoji: '🎉', count: 0 },
      { emoji: '💡', count: 2 },
      { emoji: '🚀', count: 2 },
      { emoji: '🤔', count: 2 },
    ]
  };

  const handleButtonClick = () => {
    setIsMember(!isMember);
    console.log(isMember ? 'Leaving project...' : 'Joining project...');
  };

  const handleCommentSubmit = (commentText: any) => {
    console.log('Submitting comment:', commentText);
  };

  const tabs = ['Description', 'Timelines', 'Discussion', 'Members'];

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-4">
        <Link 
          href={`/dashboard/projects/${projectId}/discussion/${discussionId}`} 

          // href={`/dashboard/projects/${projectId}`}
          className="text-blue-600 text-sm font-medium inline-flex items-center"
          prefetch={false}
      >
          <FiArrowLeft className="mr-1" /> Back to Project Details
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <ProjectHeader
                title={projectData.title}
                type={projectData.type}
                duration={projectData.duration}
                description={projectData.description}
              />
              <div className="mt-4 md:mt-0 flex-shrink-0">
                <button
                  onClick={handleButtonClick}
                  className={`${isMember ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-900 hover:bg-blue-800'} text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200`}
                >
                  {isMember ? 'Leave Project' : 'Join Project'}
                  {isMember ? <FiX className="ml-2" /> : <HiOutlineArrowRight className="ml-2" />}
                </button>
              </div>
            </div>
          </div>

          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

          <DiscussionPost
            authorName={discussionData.authorName}
            avatarUrl={discussionData.avatarUrl}
            postedTime={discussionData.postedTime}
            title={discussionData.title}
            content={discussionData.content}
            upvotes={discussionData.upvotes}
            commentsCount={discussionData.commentsCount}
          />

          <ReactionButtons reactions={discussionData.reactions} />

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Comments ({discussionData.commentsCount})</h3>
            <p className="text-gray-500">Comments will be displayed here.</p>
          </div>

          <CommentInput onCommentSubmit={handleCommentSubmit} />
        </div>

        <ProjectSidebar
          image={projectData.image}
          title={projectData.title}
          daysLeft={projectData.daysLeft}
          alertMessage="Kindly review and finalize tasks to stay on track."
          skills={projectData.skills}
          participants={projectData.participants}
          additionalParticipants={projectData.additionalParticipants}
        />
      </div>
    </div>
  );
}