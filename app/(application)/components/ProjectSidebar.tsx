"use client";

import React from 'react';
import Image from 'next/image';

// Import necessary sub-components (assuming they are in the same directory or adjust path)
import AlertNotification from './AlertNotification';
import SkillBadge from './SkillBadge';
import ParticipantCard from './ParticipantCard';

// Import shared types from the central types file
// Adjust the path '../types' if your types.ts file is located elsewhere relative to this component
import { Skill, Participant } from '@/types'; 

// Define interfaces for props based on user's ProjectData structure
interface ProjectSidebarProps {
  image?: string;
  title: string; // Needed for alt text
  daysLeft: number;
  skills: Skill[]; // Use imported Skill type
  participants: Participant[]; // Use imported Participant type
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
             <Image src={image} alt={title} layout="fill" objectFit="cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Project Image Placeholder
            </div>
          )}
        </div>
        <div className="absolute top-0 right-0 left-0 p-2">
          {/* Use AlertNotification component */}
          <AlertNotification message={alertMessage} daysLeft={daysLeft} />
        </div>
      </div>

      {/* Skills Required */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Skills Required</h3>
        <div className="flex flex-wrap">
          {skills.map((skill, index) => (
            // Use SkillBadge component
            <SkillBadge key={index} name={skill.name} icon={skill.icon} />
          ))}
        </div>
      </div>

      {/* Participants */}
      <div>
        <h3 className="text-lg font-bold mb-4">Participants</h3>
        {participants.map((participant, index) => (
          // Use ParticipantCard component
          <ParticipantCard 
            key={index}
            name={participant.name}
            role={participant.role}
            image={participant.image}
          />
        ))}
        {additionalParticipants > 0 && (
           <div className="flex items-center mt-2">
             <div className="flex -space-x-2 mr-2">
                {/* Placeholder avatars for additional participants */}
                {[...Array(Math.min(additionalParticipants, 3))].map((_, i) => (
                  <div key={`add-${i}`} className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                ))}
             </div>
             <span className="text-sm text-gray-600">+{additionalParticipants} more</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSidebar;

