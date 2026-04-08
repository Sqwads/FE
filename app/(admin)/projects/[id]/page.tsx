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
import { Modal, TextInput, Textarea, Button, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import toast from 'react-hot-toast';
import Applications from './tabs/applications';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';


const ProjectView: React.FC = () => {

  const [activeTab, setActiveTab] = useState('Description');
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [interviewModalOpened, { open: openInterviewModal, close: closeInterviewModal }] = useDisclosure(false);
  const params = useParams()
  const projectId = params.id
  const [inputValue, setInputValue] = useState('')
  const queryclient = useQueryClient()

  // Interview invite state
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [inviteMessage, setInviteMessage] = useState('');
  const [timeSlots, setTimeSlots] = useState<{ date: string; startTime: string; endTime: string }[]>([
    { date: '', startTime: '', endTime: '' }
  ]);
  const [interviewerEmails, setInterviewerEmails] = useState<string[]>([]);
  const [interviewerInput, setInterviewerInput] = useState('');


  const { data: fetchedProject } = useQuery({
    queryFn: () => instance.get(`/project/${projectId}`),
    queryKey: ['projects', projectId],
    enabled: !!projectId
  })

  const { data: fetchedApplications } = useQuery({
    queryFn: () => instance.get(`/project/applications/${projectId}`),
    queryKey: ['project-applications', projectId],
    enabled: !!projectId
  })

  const { mutate: updateApplicationStatus, isPending: updateApplicationStatusPending } = useMutation({
    mutationFn: (data: any) => instance.patch(`/project/application/`, data),
    mutationKey: ['update-project-application', projectId],
    onSuccess(response) {
      toast.success('Application Status Updated successfully!')
      queryclient.invalidateQueries({
        queryKey: ['project-applications', projectId]
      })
    },
    onError(error: any, vars) {
      toast.error(error?.response?.data?.message || 'Failed to update application status');
    }
  })

  const { mutate: editProject, isPending: projectEditIsPending } = useMutation({
    mutationFn: (data: any) => instance.patch(`/project`, data),
    mutationKey: ['projectEdit'],
    onSuccess() {
      toast.success('Project Completion Level Updated Successfully')
      close()
      setInputValue('')
      queryclient.invalidateQueries({
        queryKey: ['projects', projectId]
      })
    },

    onError(error: any) {
      toast.error('Failed to update project completion level')
      console.log(error?.response?.data)
    },
  })

  const { mutate: sendInterviewInvite, isPending: interviewInvitePending } = useMutation({
    mutationFn: (data: any) => instance.post(`/interview/invite`, data),
    mutationKey: ['interview-invite'],
    onSuccess() {
      toast.success('Interview invite sent successfully!')
      closeInterviewModal()
      resetInterviewForm()
      queryclient.invalidateQueries({
        queryKey: ['project-applications', projectId]
      })
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message || 'Failed to send interview invite');
    }
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

  const handleOpenCompletionModal = () => {
    setInputValue(fetchedProject?.data?.completionLevel || fetchedProject?.data?.completionLeve || 0)
    open()
  }

  const handleUpdateCompletionLevel = () => {
    if (Number(inputValue) > 100 || Number(inputValue) < 0) {
      return toast.error('Value should be between 0 and 100')
    }
    editProject({
      completionLevel: Number(inputValue),
      projectId
    })
  }

  const handleManageApplication = (applicationId: string, action: string) => {
    updateApplicationStatus({
      applicationId,
      status: action
    })
  }

  // Interview invite handlers
  const handleInviteToInterview = (application: any) => {
    setSelectedApplication(application);
    const userName = `${application?.user?.firstName || ''}`;
    const projectName = fetchedProject?.data?.name || 'this project';
    setInviteMessage(
      `Hi ${userName},\n\nWe were impressed with your application for ${projectName}. We'd like to invite you for a short interview to discuss the role further and get to know you better.\n\nPlease select a date and time that works best for you from the available options.\n\nLooking forward to speaking with you!`
    );
    setTimeSlots([{ date: '', startTime: '', endTime: '' }]);
    openInterviewModal();
  }

  const resetInterviewForm = () => {
    setSelectedApplication(null);
    setInviteMessage('');
    setTimeSlots([{ date: '', startTime: '', endTime: '' }]);
    setInterviewerEmails([]);
    setInterviewerInput('');
  }

  const addInterviewerEmail = () => {
    const email = interviewerInput.trim();
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return toast.error('Please enter a valid email');
    }
    if (interviewerEmails.includes(email)) {
      return toast.error('Email already added');
    }
    setInterviewerEmails([...interviewerEmails, email]);
    setInterviewerInput('');
  }

  const removeInterviewerEmail = (email: string) => {
    setInterviewerEmails(interviewerEmails.filter(e => e !== email));
  }

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { date: '', startTime: '', endTime: '' }]);
  }

  const removeTimeSlot = (index: number) => {
    if (timeSlots.length > 1) {
      setTimeSlots(timeSlots.filter((_, i) => i !== index));
    }
  }

  const updateTimeSlot = (index: number, field: string, value: string) => {
    const updated = [...timeSlots];
    updated[index] = { ...updated[index], [field]: value };
    setTimeSlots(updated);
  }

  const handleSubmitInterviewInvite = () => {
    // Validate
    if (!inviteMessage.trim()) {
      return toast.error('Please enter an invite message');
    }

    const validSlots = timeSlots.filter(s => s.date && s.startTime && s.endTime);
    if (validSlots.length === 0) {
      return toast.error('Please add at least one complete time slot');
    }

    sendInterviewInvite({
      applicationId: selectedApplication?._id,
      inviteMessage: inviteMessage.trim(),
      availableSlots: validSlots,
      ...(interviewerEmails.length > 0 && { interviewerEmails }),
    });
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

          {(activeTab === 'Discussion' && !selectedDiscussion) && (
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
              onInviteToInterview={handleInviteToInterview}
            />
          )}
        </div>
      </div>

      <div className={`space-y-0  w-[300px] sticky top-5  ${activeTab === 'Description' ? 'block' : 'hidden'}`}>

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
                placeholder="Type here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
                mb="md"
              />
              <button
                disabled={projectEditIsPending || inputValue == ''}
                className='bg-[#001D69] disabled:opacity-50 py-2 rounded-md px-4 text-white'
                onClick={handleUpdateCompletionLevel}
              >
                {projectEditIsPending ? 'Saving...' : 'Submit'}
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

      {/* Interview Invite Modal */}
      <Modal
        opened={interviewModalOpened}
        centered
        onClose={closeInterviewModal}
        title={
          <span className="text-lg font-semibold text-[#001D69]">
            Invite to Interview
          </span>
        }
        size="lg"
      >
        <div className="py-4 px-2">
          {selectedApplication && (
            <div className="mb-5 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Inviting <strong>{selectedApplication?.user?.firstName} {selectedApplication?.user?.lastName}</strong>
                {' '}for the <strong>{selectedApplication?.role}</strong> role
              </p>
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Invite Message</label>
            <Textarea
              value={inviteMessage}
              onChange={(e) => setInviteMessage(e.currentTarget.value)}
              minRows={6}
              autosize
              placeholder="Write your invite message..."
              styles={{
                input: {
                  fontSize: '14px',
                  lineHeight: '1.6',
                }
              }}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Other Interviewers (optional)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="email"
                value={interviewerInput}
                onChange={(e) => setInterviewerInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addInterviewerEmail(); } }}
                placeholder="Enter interviewer email"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addInterviewerEmail}
                className="px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>
            {interviewerEmails.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {interviewerEmails.map((email) => (
                  <span key={email} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                    {email}
                    <button type="button" onClick={() => removeInterviewerEmail(email)} className="hover:text-red-500">
                      <FiX size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">Available Time Slots</label>
              <button
                type="button"
                onClick={addTimeSlot}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FiPlus size={16} />
                Add Slot
              </button>
            </div>

            <div className="space-y-3">
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex items-end gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Date</label>
                    <input
                      type="date"
                      value={slot.date}
                      onChange={(e) => updateTimeSlot(index, 'date', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">End Time</label>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {timeSlots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(index)}
                      className="p-2 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={closeInterviewModal}
              className="px-4 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={interviewInvitePending}
              onClick={handleSubmitInterviewInvite}
              className="px-6 py-2 text-sm bg-[#001D69] text-white rounded-lg hover:bg-[#002a8f] disabled:opacity-50 transition-colors"
            >
              {interviewInvitePending ? 'Sending...' : 'Send Invite'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectView;
