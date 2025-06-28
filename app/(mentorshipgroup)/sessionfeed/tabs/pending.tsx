"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FiArrowRight, FiCalendar, FiClock, FiCheck, FiX, FiArrowLeft, FiInfo } from 'react-icons/fi';

import EmptyState from '../../components/EmptyState';
import moment from 'moment';
import { Modal, TextInput, Button } from '@mantine/core';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/api/instance';

// Define the session request type
interface SessionRequest {
  id: string;
  mentee: {
    name: string;
    image: string;
    discipline?: string;
  };
  sessionType: string;
  sessionTitle?: string;
  requestTime: string;
  sessionDate: string;
  sessionTime: string;
  notes?: string;
  dateCreated?: string;
  expiresIn?: string;
}

const MeetingLinkModal = ({ 
  open, onClose, submit , selectedRequest, isSubmitting
}: 
{ 
    open: boolean; 
    onClose: () => void; 
    // onSubmit: (link: string) => void ,
    selectedRequest?: any,
    submit: (link:string) => void,
    isSubmitting?: boolean
}) => {
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
   
    if(link.trim() === '')  return toast.error('Please enter a meeting link');
    submit(link)
    setLink('');
  };

  return (
    <Modal opened={open} onClose={onClose} title="Add Meeting Link" centered>
      
       <div className="lg:px-7 px-4 py-7">
         <TextInput
          label="Meeting Link"
          placeholder="Enter meeting link"
          value={link}
          onChange={(e) => setLink(e.currentTarget.value)}
          required
          mb="md"
        />
        <Button disabled={isSubmitting} className='disabled:opacity-50' onClick={handleSubmit} type="submit" fullWidth>
           {isSubmitting ? 'Submitting...' : 'Submit Meeting Link'}
        </Button>
       </div>
     
    </Modal>
  );
};


// Session request card component
const SessionRequestCard = ({ request, onClick, onAccept, onCancel }:any) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Top section with image */}
      <div className="h-28 overflow-hidden">
        <Image 
          src={request?.mentee?.image || '/images/profile.jpg'} 
          alt={'n'}
          width={400}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content section */}
      <div className="p-4">
        {/* Mentee name and session type */}
        <h3 className="text-blue-900 font-semibold text-lg">{request?.mentee?.firstName} {request?.mentee?.lastName}</h3>
        <p className="text-gray-600 text-sm mb-2">General Mentorship Sessions</p>
        
        {/* Request timing */}
        <p className="text-gray-500 text-xs mb-4">
          Date of Request: <span className="font-medium">{moment(request?.created_at).format('MMMM Do YYYY')}</span>
        </p>
        
        {/* Session date with calendar icon */}
        <div className="flex items-center text-sm text-gray-700 mb-3">
          <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
            <FiCalendar size={16} />
          </div>
          <span>{moment(request?.date).format('MMMM Do YYYY')}</span>
        </div>
        
        {/* Session time with clock icon */}
        <div className="flex items-center text-sm text-gray-700 mb-4">
          <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
            <FiClock size={16} />
          </div>
          <span>{request?.time}</span>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center justify-between mt-2">
          <button 
            className="text-blue-900 font-medium text-sm flex items-center"
            onClick={onClick}
          >
            Details <FiArrowRight className="ml-1" />
          </button>
          
          <div className="flex space-x-2">
            <button onClick={()=>onCancel(request?._id)} className="w-8 h-8 rounded-full border border-red-500 text-red-500 hover:bg-red-50 flex items-center justify-center">
              <FiX size={16} />
            </button>
            <button onClick={()=>onAccept(request)}  className="w-8 h-8 rounded-full border border-green-500 text-green-500 hover:bg-green-50 flex items-center justify-center">
              <FiCheck size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Session Details View Component
const SessionDetailsView  = ({ request, onBack, onAccept, onCancel }:any) => {
  return (
    <div className="bg-white rounded-lg border border-blue-200 p-6">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 mr-4 flex items-center"
        >
          <FiArrowLeft className="mr-1" /> Back
        </button>
        <h2 className="text-xl font-semibold">
          Mentorship Session with <span className="text-blue-600">{request?.mentee?.firstName} {request?.mentee?.lastName}</span>
        </h2>
      </div>

      {/* Session date and time info */}
      <div className="flex flex-col md:flex-row md:items-center border-b pb-6 mb-6">
        <div className="flex items-center mr-8 mb-3 md:mb-0">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
            <FiCalendar className="text-gray-500" />
          </div>
          <span className="text-gray-700">{moment(request?.date).format('MMMM Do YYYY')}</span>
        </div>
        <div className="flex items-center mr-8 mb-3 md:mb-0">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
            <FiClock className="text-gray-500" />
          </div>
          <span className="text-gray-700">{request?.time}</span>
        </div>
        <div className="text-gray-700">
          Date of Request: <span className="font-medium">{moment(request?.created_at).format('MMMM Do YYYY')}</span>
        </div>
      </div>

      {/* Mentee info */}
      <div className="mb-6">
        <h3 className="text-gray-600 mb-3">Mentee:</h3>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img 
              src={'/images/profile.jpg'} 
              alt={'n'}
              width={48}
              height={48}
              className="w-full h-full object-cover border"
            />
          </div>
          <div>
            <h4 className="font-semibold">{request?.mentee?.firstName} {request?.mentee?.lastName}</h4>
            <p className="text-gray-600 text-sm">Discipline: {request?.mentee?.skills_of_interest?.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Session title */}
      <div className="mb-6">
        <h3 className="text-gray-600 mb-1">Session Title</h3>
        <p className="font-medium">{'Mentoship Session'}</p>
      </div>

      {/* Optional notes */}
      <div className="mb-8">
        <h3 className="text-gray-600 mb-1">Optional Notes</h3>
        <p className="text-gray-800">{request?.note}</p>
      </div>

      {/* Date created */}
      <div className="mb-8">
        <p className="text-gray-600">Date Created: <span className="font-medium">{moment(request?.created_at).format('MMMM Do YYYY')}</span></p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
          Send Message
        </button> */}
        <button onClick={()=>onAccept(request)} className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Accept
        </button>
        <button onClick={()=>onCancel(request?._id)} className="px-5 py-2 bg-red-100 text-red-500 rounded-md hover:bg-red-200">
          Cancel
        </button>
      </div>

      {/* Expiration notice */}
      <div className="bg-blue-50 p-4 rounded-md flex items-start">
        <FiInfo className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm text-gray-700">
          This pending request will <span className="font-medium">expire in {request.expiresIn}</span> if not accepted or declined.
        </p>
      </div>
    </div>
  );
};

// Main Pending component
const Pending= ({data}:{data: any[]}) => {
  
  const [processingRequest, setProcessingRequest] = useState<any>(null);
  const [selectedRequest, setSelectedRequest] = useState<SessionRequest | null>(null);
  const [openMeetingLinkModal, setOpenMeetingLinkModal] = useState(false);
  const queryClient = useQueryClient()

  const {mutate, isPending} = useMutation({
    mutationFn: (data:any)=>instance.patch(`/mentors/update-booking/${data?.id}`, data), 
    mutationKey: ['mentor-bookings-edit'],
    onSuccess(data, variables, context) {
       if(variables.status === 'CANCELLED') {
        toast.success('Booking cancelled successfully');
       }else{
         toast.success('Session Approved!');
       }
        setOpenMeetingLinkModal(false);
        setProcessingRequest(null);
        queryClient.invalidateQueries({
          queryKey: ['mentor-bookingss']})
    },
    onError(error, variables, context) {
        toast.error('Failed to submit meeting link. Please try again.');
    },
  })

  const handleSubmitMeetingLink = (link: string) => {
    if (!processingRequest) return;
    mutate({
      id: processingRequest._id,
      meetingLink: link,
      status:'UPCOMING'
    });
  }

   const handleCancelBooking = (booking:string) => {
    mutate({
      id: booking,
      status:'CANCELLED'
    });
  }

  if (!data || data.length === 0) {
    // Use the reusable EmptyState component
    return (
      <EmptyState
        title="No pending sessions yet!"
        description="You haven't been approached for any mentorship requests yet. Share your expertise and start guiding eager mentees today."
        // actionText="Update Profile"
        actionLink="/profile"
        illustration={
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 90L30 70V40L60 20L90 40V70L60 90Z" fill="#E5E7EB" />
            <path d="M60 90V60L90 40V70L60 90Z" fill="#D1D5DB" />
            <path d="M60 60V90L30 70V40L60 60Z" fill="#F3F4F6" />
            <path d="M60 60L30 40L60 20L90 40L60 60Z" fill="#F9FAFB" />
            <path d="M60 20V60L90 40L60 20Z" fill="#F3F4F6" />
            <path d="M45 30C45 30 55 40 75 30" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="75" cy="30" r="4" fill="#9CA3AF" />
          </svg>
        }
      />
    );
  }

  // If a session is selected, show the details view
  if (selectedRequest) {
    return (
      <>
      <SessionDetailsView 
        request={selectedRequest} 
        onBack={() => setSelectedRequest(null)} 
        onAccept ={(request:any) => {
          setOpenMeetingLinkModal(true);
          setProcessingRequest(request);
        }}
        onCancel={handleCancelBooking}
      />
      <MeetingLinkModal 
        open={openMeetingLinkModal}
        onClose={() => setOpenMeetingLinkModal(false)}
        selectedRequest={selectedRequest}
        submit={(val:any)=>handleSubmitMeetingLink( val)}
        isSubmitting={isPending}
        
      />
      </>
      

      
        
    );
  }
  
  // Otherwise show the list of session cards
  return (
    <div className="p-6">
      <MeetingLinkModal 
        open={openMeetingLinkModal}
        onClose={() => setOpenMeetingLinkModal(false)}
        selectedRequest={selectedRequest}
        submit={(link:string)=>handleSubmitMeetingLink( link)}
        isSubmitting={isPending}
       
      />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"> 
            {data?.map((request:any, idx:number) => (
                <SessionRequestCard 
                    key={idx} 
                    request={request} 
                    onClick={() => setSelectedRequest(request)}
                    onAccept ={(request:any) => {
                      setOpenMeetingLinkModal(true);
                      setProcessingRequest(request);
                    }}
                    onCancel={handleCancelBooking}
                />
                ))}
            </div>
            </div>
    );
};

export default Pending;
