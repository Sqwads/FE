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
import { useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import { getDayDifference, getTimeDifference } from '@/common';
import ProjectDescription from '@/app/(admin)/projects/[id]/tabs/ProjectDescription';
import Members from '@/app/(admin)/projects/[id]/tabs/members';
import Discussions from '@/app/(admin)/projects/[id]/tabs/discussion';
import DiscussionDetails from '@/app/(admin)/projects/[id]/tabs/discussionDetails';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Select, Button } from '@mantine/core';
import toast from 'react-hot-toast';
import { userWrapper } from '@/store';

function ProjectDetailsContent() {
  const [activeTab, setActiveTab] = useState('Description');
  const [modalOpened, { open:openModal, close:closeModal }] = useDisclosure(false);
  const params = useParams()
  const projectId = params.projectId
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);

  const { user } = userWrapper((state: any) => ({
    user: state.user,
  }));

  const {data: fetchedProject} = useQuery({
      queryFn: ()=>instance.get(`/project/${projectId}`),
      queryKey: ['projects', projectId],
      enabled: !!projectId
  })

  const [role, setRole] = useState('');

  const handleDiscussionClick = (id: string) => {
    setSelectedDiscussion(id);
  }

  const available_roles = fetchedProject?.data?.skills?.map((role: any) =>role?.name) || [];

  const {mutate, isPending} = useMutation({
    mutationFn: (data: any) => instance.post(`/project/application/`, data),
    mutationKey: ['join-project', projectId],
    onSuccess(response) {
      closeModal();
      toast.success('Application submitted successfully!');
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message || 'Failed to apply for project');
    },
  })

  const handleApplyClick = () => {
    if (!user?.socialProfile?.linkedin) {
      toast.error('Please upload your LinkedIn profile in the settings page before you can apply for projects.');
      return;
    }
    
    openModal();
  };

  const handleApplyForProject = () => {
    if (!role) {
      toast.error('Please select a role');
      return;
    }
    mutate({
      project: projectId,
      role: role,
      user: fetchedProject?.data?.projectLead?._id
    })
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

        <div className="flex-1">
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
                  onClick={handleApplyClick}
                  className={`text-sm  bg-blue-900  text-white px-4 py-2 rounded-md flex items-center  sm:text-base`}
                >
                  Apply For Project
                </button>
              </div>
            </div>
          </div>

          <NavigationTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={['Description', 'Discussion', 'Members']}
          />

          {/* Tab Content */}
          {activeTab === 'Description' && (
            <ProjectDescription 
              overview={fetchedProject?.data?.overview}
              features={fetchedProject?.data?.features}
              currentDay={getDayDifference(fetchedProject?.data?.startDate, fetchedProject?.data?.endDate).currentDay}
              endDay={getDayDifference(fetchedProject?.data?.startDate, fetchedProject?.data?.endDate).endDay}
            />
          )}

        
          {(activeTab === 'Discussion'  && !selectedDiscussion) && (
              <Discussions
                projectId={projectId}
                onDiscussionClick={handleDiscussionClick}
              />
          )}

           {
              activeTab === 'Discussion' && selectedDiscussion && (
                <DiscussionDetails
                  discussionId={selectedDiscussion}
                  onBack={() => setSelectedDiscussion(null)}
                />
              )
            }
          
          {activeTab === 'Members' && (
            <Members
              members={fetchedProject?.data?.teamMembers}
            />
          )}
        </div>

        <ProjectSidebar
          image={fetchedProject?.data?.coverImage}
          skills={fetchedProject?.data?.skills?.flatMap((item:any)=> item?.tools).slice(0,3)|| []}
          participants={fetchedProject?.data?.teamMembers}
          projectLead={fetchedProject?.data?.projectLead}
        />
      </div>

        <Modal 
          centered
          opened={modalOpened} 
          onClose={closeModal} 
          size={'md'}
          styles={{
              content:{
              borderRadius:"1rem",  
              }
          }}
        >
          <div>
            
            <Select
              label="Select Role"
              placeholder="Pick one"
              data={available_roles}
              value={role}
              onChange={(value) => setRole(value || '')}
            />

            <button
              disabled={!role || isPending}
              className="bg-blue-900 text-sm mt-5 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleApplyForProject}
            >
             {isPending ? 'Applying...' : 'Submit Application'}
            </button>
          </div>
        </Modal>
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