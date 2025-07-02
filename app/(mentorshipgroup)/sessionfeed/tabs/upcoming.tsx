"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FiArrowRight, FiCalendar, FiClock, FiArrowLeft } from 'react-icons/fi';
import { formatDistanceToNow, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, isFuture } from 'date-fns';
import moment from 'moment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import toast from 'react-hot-toast';

export function relativeDateString(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const now = new Date();

  const days = differenceInDays(date, now);
  const absDays = Math.abs(days);

  if (absDays < 7) {
    if (days > 0) return `in ${absDays} day${absDays === 1 ? '' : 's'}`;
    if (days < 0) return `${absDays} day${absDays === 1 ? '' : 's'} ago`;
    return 'today';
  }

  const weeks = differenceInWeeks(date, now);
  const absWeeks = Math.abs(weeks);
  if (absWeeks < 4) {
    if (weeks > 0) return `in ${absWeeks} week${absWeeks === 1 ? '' : 's'}`;
    if (weeks < 0) return `${absWeeks} week${absWeeks === 1 ? '' : 's'} ago`;
  }

  const months = differenceInMonths(date, now);
  const absMonths = Math.abs(months);
  if (absMonths < 12) {
    if (months > 0) return `in ${absMonths} month${absMonths === 1 ? '' : 's'}`;
    if (months < 0) return `${absMonths} month${absMonths === 1 ? '' : 's'} ago`;
  }

  const years = differenceInYears(date, now);
  const absYears = Math.abs(years);
  if (years > 0) return `in ${absYears} year${absYears === 1 ? '' : 's'}`;
  if (years < 0) return `${absYears} year${absYears === 1 ? '' : 's'} ago`;

  return formatDistanceToNow(date, { addSuffix: true });
}


// Upcoming session card component
const UpcomingSessionCard: React.FC<{ 
  session: any;
  onClick: () => void;
}> = ({ session, onClick }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Top section with image */}
      <div className="h-28 overflow-hidden">
        <img 
          src={'/images/profile.jpg'} 
          alt={'ibf'}
          width={400}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content section */}
      <div className="p-4">
        {/* Mentee name and session type */}
        <h3 className="text-blue-900 font-semibold text-lg">{session?.mentee?.firstName} {session?.mentee?.lastName}</h3>
        <p className="text-gray-600 text-sm mb-2">{session?.title || 'General Mentorship Sessions'}</p>
        
        {/* Session date info */}
        <p className="text-gray-500 text-xs mb-4">
          Session Date: <span className="font-medium">In {relativeDateString(session?.date)} </span>
        </p>
        
        {/* Session date with calendar icon */}
        <div className="flex items-center text-sm text-gray-700 mb-3">
          <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
            <FiCalendar size={16} />
          </div>
          <span>{moment(session?.date).format('MMMM Do YYYY').toUpperCase()}</span>
        </div>
        
        {/* Session time with clock icon */}
        <div className="flex items-center text-sm text-gray-700 mb-4">
          <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
            <FiClock size={16} />
          </div>
          <span>{session?.time}</span>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center justify-between mt-2">
          <button 
            className="text-blue-900 font-medium text-sm flex items-center"
            onClick={onClick}
          >
            Details <FiArrowRight className="ml-1" />
          </button>
          
          {/* <button className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
            Send Message
          </button> */}
        </div>
      </div>
    </div>
  );
};

// Session Details View Component
const SessionDetailsView = ({
   session, onBack 
  }: any) => {

    const queryClient = useQueryClient();
    const {mutate, isPending} = useMutation({
    mutationFn: (data:any)=>instance.patch(`/mentors/update-booking/${data?.id}`, data), 
    mutationKey: ['mentor-bookings-edit'],
    onSuccess(data, variables, context) {
       toast.success('Session Markeda as Completed!');
        
        queryClient.invalidateQueries({
          queryKey: ['mentor-bookingss']})
    },
    onError(error, variables, context) {
        toast.error('Failed to submit meeting link. Please try again.');
    },
  })
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
          Upcoming Mentorship Session with <span className="text-blue-600">{session.mentee.firstName} {session.mentee.lastName}</span>
        </h2>
      </div>

      {/* Session date and time info */}
      <div className="flex flex-col md:flex-row md:items-center border-b pb-6 mb-6">
        <div className="flex items-center mr-8 mb-3 md:mb-0">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
            <FiCalendar className="text-gray-500" />
          </div>
          <span className="text-gray-700">{moment(session?.date).format('MMMM Do YYYY')}</span>
        </div>
        <div className="flex items-center mr-8 mb-3 md:mb-0">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
            <FiClock className="text-gray-500" />
          </div>
          <span className="text-gray-700">{session?.time}</span>
        </div>
        <div className="text-gray-700">
          Date of Request: <span className="font-medium">{moment(session?.created_at).format('MMMM Do YYYY')}</span>
        </div>
      </div>

      {/* Mentee info */}
      <div className="mb-6">
        <h3 className="text-gray-600 mb-3">Mentee:</h3>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img 
              src={session?.mentee?.image || '/images/profile.jpg'} 
              alt={'m'}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold">{session?.mentee?.firstName} {session?.mentee?.lastName}</h4>
            <p className="text-gray-600 text-sm">Discipline: {session?.mentee?.skills_of_interest?.join(', ')}</p>
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
        <p className="text-gray-800">{session?.note}</p>
      </div>

      {/* Date created */}
      <div className="mb-8">
        <p className="text-gray-600">Date Created: <span className="font-medium">{moment(session?.created_at).format('MMMM Do YYYY')}</span></p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {/* <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
          Send Message
        </button> */}
        <a
          href={session?.meetingLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          Join Session <FiArrowRight className="ml-2" />
        </a>

        <button
          className="px-5 disabled:opacity-50 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 flex items-center"
          onClick={() =>mutate({
            id: session?._id,
            status: 'COMPLETED'
          })}
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Mark as Completed'}
        </button>
      </div>
    </div>
  );
};

// Empty state component for when there are no upcoming sessions
const EmptyUpcomingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Empty illustration */}
      <div className="mb-6">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 90L30 70V40L60 20L90 40V70L60 90Z" fill="#E5E7EB" />
          <path d="M60 90V60L90 40V70L60 90Z" fill="#D1D5DB" />
          <path d="M60 60V90L30 70V40L60 60Z" fill="#F3F4F6" />
          <path d="M60 60L30 40L60 20L90 40L60 60Z" fill="#F9FAFB" />
          <path d="M60 20V60L90 40L60 20Z" fill="#F3F4F6" />
          <path d="M45 30C45 30 55 40 75 30" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="75" cy="30" r="4" fill="#9CA3AF" />
        </svg>
      </div>
      
      {/* Empty state text */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming sessions</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        You don't have any upcoming mentorship sessions scheduled.
        Check your pending requests or update your availability to get more sessions.
      </p>
      
      {/* Action button */}
      {/* <button className="bg-blue-900 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-800 transition-colors">
        <span>Update Availability</span>
        <FiArrowRight />
      </button> */}
    </div>
  );
};

// Main Upcoming component
const Upcoming = ({data}:{data: any[]}) => {
  // For demo purposes, you can toggle between empty and non-empty states
  // In a real app, this would be determined by actual data
  const [hasUpcomingSessions, setHasUpcomingSessions] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  
  if (data?.length === 0) {
    return <EmptyUpcomingState />;
  }

  // If a session is selected, show the details view
  if (selectedSession) {
    return (
      <SessionDetailsView 
        session={selectedSession} 
        onBack={() => setSelectedSession(null)} 
      />
    );
  }
  
  return (
    <div className="lg:px-6 px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {data?.map((session:any, idx:number) => (
          <UpcomingSessionCard 
            key={idx} 
            session={session} 
            onClick={() => setSelectedSession(session)}
          />
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
