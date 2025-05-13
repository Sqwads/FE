"use client";

import React from 'react';
import Image from 'next/image';

// Import necessary sub-components (assuming they are in the same directory or adjust path)
import AlertNotification from './AlertNotification';
import SkillBadge from './SkillBadge';
import ParticipantCard from './ParticipantCard';

// Import shared types from the central types file
// Adjust the path '../types' if your types.ts file is located elsewhere relative to this component
import { Skill, Participant } from '../type'; 

// Define interfaces for props based on user's ProjectData structure
interface ProjectSidebarProps {
  image?: string | null;
  title: string; // Needed for alt text
  daysLeft: number;
  skills: any[]; // Use imported Skill type
  participants: any[]; // Use imported Participant type
  additionalParticipants: number;
  // Add alertMessage prop if it's dynamic, otherwise define inside
  alertMessage?: string; 
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ 
  image, 
  title,
  daysLeft, 
  skills, 
  participants, 
  additionalParticipants,
  alertMessage = "Review and finalize tasks" // Default message from user's code
}) => {
  return (
    <div className="lg:w-1/3">
      {/* Image with Alert Overlay */}
      <div className="relative mb-6">
        <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
          {image ? (
             <img src={image} alt={title} className='h-48 w-full object-cover' />
          ) : (
             <Image src={"/images/proj-placeholder.jpg"} alt={title} layout="fill" objectFit="cover" />
          )}
        </div>
        {/* <div className="absolute top-0 right-0 left-0 p-2">
         
          <AlertNotification message={alertMessage} daysLeft={daysLeft} />
        </div> */}
      </div>

      {/* Skills Required */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Skills Required</h3>
        <div className="flex flex-wrap gap-x-4">
          {skills.map((skill, index) => (
            // Use SkillBadge component
            <SkillBadge key={index} name={skill} icon={skill[0]} />
          ))}
        </div>
      </div>

      {/* Participants */}
      <div>
        <h3 className="text-lg font-bold mb-4">Participants</h3>
        {participants?.slice(0,2)?.map((participant, index) => (
          // Use ParticipantCard component
          <ParticipantCard 
            key={index}
            name={`${participant?.user?.firstName} ${participant?.user?.lastName}`}
            role={participant.role}
            image={participant.image}
          />
        ))}
        {participants?.length > 0 && (
           <div className="flex items-center mt-2">
             <div className="flex -space-x-2 mr-2">
                {/* Placeholder avatars for additional participants */}
                {participants?.slice(3).map((item:any, i) => (
                  <div key={`add-${i}`} className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                ))}
             </div>
             {participants.length > 2 && <span className="text-sm text-gray-600">+{participants?.length - 3} more</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSidebar;

