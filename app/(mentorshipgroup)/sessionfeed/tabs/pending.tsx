"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FiArrowRight, FiCalendar, FiClock, FiCheck, FiX, FiArrowLeft, FiInfo } from 'react-icons/fi';

import EmptyState from '../../components/EmptyState';

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

// Sample data for pending session requests
const pendingRequests: SessionRequest[] = [
  {
    id: '1',
    mentee: {
      name: 'Saad Bashar',
      image: '/images/saad.png', 
      discipline: 'Product Design',
    },
    sessionType: 'CV/Portfolio Review Session',
    sessionTitle: 'CV/Portfolio Revamp',
    requestTime: '38 minutes ago',
    sessionDate: 'Thurs, 2nd Oct, 2024',
    sessionTime: '11:00 - 11:30 AM',
    notes: 'I would like you to have an extensive review on my UI/UX Portfolio and have you assist me on cues to land my next role. Please find attached the link to my portfolio and an online copy of my CV.',
    dateCreated: 'Jun 10, 2025 WAT',
    expiresIn: '3 days',
  },
  {
    id: '2',
    mentee: {
      name: 'Comfort Tayo',
      image: '/images/tayo.png',
      discipline: 'Frontend Development',
    },
    sessionType: 'CV/Portfolio Review Session',
    sessionTitle: 'CV/Portfolio Revamp',
    requestTime: '2 Days ago',
    sessionDate: 'Mon, 20th Jun, 2025',
    sessionTime: '11:00 - 11:30 AM',
    notes: 'I need help reviewing my frontend portfolio and improving my resume to highlight my React and TypeScript skills better.',
    dateCreated: 'Jun 8, 2025 WAT',
    expiresIn: '1 day',
  },
];

// Session request card component
const SessionRequestCard: React.FC<{ 
  request: SessionRequest;
  onClick: () => void;
}> = ({ request, onClick }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Top section with image */}
      <div className="h-28 overflow-hidden">
        <Image 
          src={request.mentee.image} 
          alt={request.mentee.name}
          width={400}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content section */}
      <div className="p-4">
        {/* Mentee name and session type */}
        <h3 className="text-blue-900 font-semibold text-lg">{request.mentee.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{request.sessionType}</p>
        
        {/* Request timing */}
        <p className="text-gray-500 text-xs mb-4">
          Date of Request: <span className="font-medium">{request.requestTime}</span>
        </p>
        
        {/* Session date with calendar icon */}
        <div className="flex items-center text-sm text-gray-700 mb-3">
          <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
            <FiCalendar size={16} />
          </div>
          <span>{request.sessionDate}</span>
        </div>
        
        {/* Session time with clock icon */}
        <div className="flex items-center text-sm text-gray-700 mb-4">
          <div className="w-5 h-5 mr-2 flex items-center justify-center text-gray-400">
            <FiClock size={16} />
          </div>
          <span>{request.sessionTime}</span>
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
            <button className="w-8 h-8 rounded-full border border-red-500 text-red-500 hover:bg-red-50 flex items-center justify-center">
              <FiX size={16} />
            </button>
            <button className="w-8 h-8 rounded-full border border-green-500 text-green-500 hover:bg-green-50 flex items-center justify-center">
              <FiCheck size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Session Details View Component
const SessionDetailsView: React.FC<{
  request: SessionRequest;
  onBack: () => void;
}> = ({ request, onBack }) => {
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
          Mentorship Session with <span className="text-blue-600">{request.mentee.name}</span>
        </h2>
      </div>

      {/* Session date and time info */}
      <div className="flex flex-col md:flex-row md:items-center border-b pb-6 mb-6">
        <div className="flex items-center mr-8 mb-3 md:mb-0">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
            <FiCalendar className="text-gray-500" />
          </div>
          <span className="text-gray-700">{request.sessionDate}</span>
        </div>
        <div className="flex items-center mr-8 mb-3 md:mb-0">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
            <FiClock className="text-gray-500" />
          </div>
          <span className="text-gray-700">{request.sessionTime}</span>
        </div>
        <div className="text-gray-700">
          Date of Request: <span className="font-medium">{request.requestTime}</span>
        </div>
      </div>

      {/* Mentee info */}
      <div className="mb-6">
        <h3 className="text-gray-600 mb-3">Mentee:</h3>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <Image 
              src={request.mentee.image} 
              alt={request.mentee.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold">{request.mentee.name}</h4>
            <p className="text-gray-600 text-sm">Discipline: {request.mentee.discipline}</p>
          </div>
        </div>
      </div>

      {/* Session title */}
      <div className="mb-6">
        <h3 className="text-gray-600 mb-1">Session Title</h3>
        <p className="font-medium">{request.sessionTitle}</p>
      </div>

      {/* Optional notes */}
      <div className="mb-8">
        <h3 className="text-gray-600 mb-1">Optional Notes</h3>
        <p className="text-gray-800">{request.notes}</p>
      </div>

      {/* Date created */}
      <div className="mb-8">
        <p className="text-gray-600">Date Created: <span className="font-medium">{request.dateCreated}</span></p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
          Send Message
        </button>
        <button className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Accept
        </button>
        <button className="px-5 py-2 bg-red-100 text-red-500 rounded-md hover:bg-red-200">
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
const Pending: React.FC = () => {
  // For demo purposes, you can toggle between empty and non-empty states
  // In a real app, this would be determined by actual data
  const [hasPendingRequests, setHasPendingRequests] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<SessionRequest | null>(null);
  
  if (!hasPendingRequests) {
    // Use the reusable EmptyState component
    return (
      <EmptyState
        title="No pending sessions yet!"
        description="You haven't been approached for any mentorship requests yet. Share your expertise and start guiding eager mentees today."
        actionText="Update Profile"
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
      <SessionDetailsView 
        request={selectedRequest} 
        onBack={() => setSelectedRequest(null)} 
      />
    );
  }
  
  // Otherwise show the list of session cards
  return (
    <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"> 
            {pendingRequests.map((request) => (
                <SessionRequestCard 
                    key={request.id} 
                    request={request} 
                    onClick={() => setSelectedRequest(request)}
                />
                ))}
            </div>
            </div>
    );
    };

export default Pending;
