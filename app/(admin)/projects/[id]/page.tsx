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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { getDayDifference, getTimeDifference } from '@/common';
import Discussions from './tabs/discussion';
import DiscussionDetails from './tabs/discussionDetails';
import { Modal, TextInput, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import toast from 'react-hot-toast';
import Applications from './tabs/applications';

const ProjectView: React.FC = () => {

  const [activeTab, setActiveTab] = useState('Description');
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const params = useParams()
  const projectId = params.id
  const [inputValue, setInputValue] = useState('')
  const queryclient = useQueryClient()

  
  const {data: fetchedProject} = useQuery({
      queryFn: ()=>instance.get(`/project/${projectId}`),
      queryKey: ['projects', projectId],
      enabled: !!projectId
  })

  const {data: fetchedApplications} = useQuery({
      queryFn: ()=>instance.get(`/project/applications/${projectId}`),
      queryKey: ['project-applications', projectId],
      enabled: !!projectId
  })

  const {mutate: updateApplicationStatus, isPending: updateApplicationStatusPending} = useMutation({
      mutationFn: (data: any) => instance.patch(`/project/application/`, data),
      mutationKey: ['update-project-application', projectId],
      onSuccess(response) {
        toast.success('Application Status Updated successfully!')
        queryclient.invalidateQueries({
          queryKey: ['project-applications', projectId]
        })
      },
      onError(error: any, vars) {
        toast.error(error?.response?.data?.message || 'Failed toupdate application status');
      }
  })

  const {mutate:editProject, isPending: projectEditIsPending} = useMutation({
      mutationFn: (data:any)=>instance.patch(`/project`, data),
      mutationKey: ['projectEdit'],
      onSuccess() {
         toast.success('Project Completion Level Updated Successfully')
         close()
         setInputValue('')
         queryclient.invalidateQueries({
          queryKey: ['projects', projectId]
         })
      },

      onError(error:any) {
          toast.error('Failed to update project completion level')
          console.log(error?.response?.data)
      },
  })

  const handleDiscussionClick = (id: string) => {
    console.log('Discussion clicked:', id);
    setSelectedDiscussion(id);
  }
  
  const getProgressColor = (percentage: any) => {
      if (percentage < 30) return 'bg-red-500';
      if (percentage < 70) return 'bg-yellow-500';
      return 'bg-green-500';
  };

  const handleOpenCompletionModal = ()=>{
    setInputValue(fetchedProject?.data?.completionLevel || fetchedProject?.data?.completionLeve || 0 )
    open()
  }

  const handleUpdateCompletionLevel = ()=>{
    if(Number(inputValue) > 100 || Number(inputValue) < 0){
      return toast.error('Value should be between 0 and 100')
    }
    editProject({
      completionLevel: Number(inputValue),
      projectId
    })
  }

  const handleManageApplication = (applicationId: string, action: string) => {
    // console.log('Manage Application:', applicationId, action);
    updateApplicationStatus({
      applicationId,
      status: action
    })
  }

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
          
          <div className="mb-14">
            <NavigationTabs 
              totalApplications={fetchedApplications?.data?.data?.length || 0}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
    
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
              showOptions
            />
          )}
          
          {(activeTab === 'Discussion'  && !selectedDiscussion) && (
            <Discussions
              projectId={projectId}
              showNewBtn={true}
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

          {activeTab === 'Applications' && (
            <Applications
              applications={fetchedApplications?.data?.data || []}
              projectId={projectId as string}
              handleManageApplication={handleManageApplication}
              projectName={fetchedProject?.data?.name}
            />
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
            <img 
              src={fetchedProject?.data?.coverImage || '/images/proj-placeholder.jpg'}
              alt='timeline'
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Horizontal Divider */}
        <hr className="border-gray-200 my-6" />

        <div className="mb-4 px-4">
          <div className="flex justify-end text-sm underline text-[#001D69] mb-1 cursor-pointer" onClick={handleOpenCompletionModal}>Edit</div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Completion Level</span>
              <span className="text-sm font-medium">{fetchedProject?.data?.completionLevel || fetchedProject?.data?.completionLeve}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`${getProgressColor(fetchedProject?.data?.completionLevel || fetchedProject?.data?.completionLeve || 0)} h-2 rounded-full`} 
                style={{ width: `${fetchedProject?.data?.completionLevel || fetchedProject?.data?.completionLeve || 0}%` }}
              ></div>
            </div>
        </div>

        
      

        <div className="mb-4 px-4">
         
          <Modal opened={opened} centered onClose={close} title="Enter Value">
            <div className='py-7 px-5'>
              <div className="mb-1 text-[#001D69]">Completetion Level</div>
              <TextInput
                // label="Your Input"
                placeholder="Type here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
                mb="md"
              />
              <button 
                 disabled={projectEditIsPending || inputValue==''} 
                 className='bg-[#001D69] disabled:opacity-50 py-2 rounded-md px-4 text-white' 
                 onClick={handleUpdateCompletionLevel}
              >
                  {projectEditIsPending? 'Saving...':'Submit'}
              </button>
            </div>
          </Modal>
        </div>

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
          totalUsers={2}
          onEdit={() => console.log('Edit users')}
        />
      </div>
    </div>
  );
};

export default ProjectView;
