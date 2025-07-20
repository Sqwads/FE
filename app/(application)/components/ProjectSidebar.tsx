"use client";

import React from 'react';
import Image from 'next/image';

import AlertNotification from './AlertNotification';
import SkillBadge from './SkillBadge';
import ParticipantCard from './ParticipantCard';

import { Skill, Participant } from '../type'; 

interface ProjectSidebarProps {
  image?: string | null;
  title?: string; 
  daysLeft?: number;
  skills?: any[]; 
  participants?: any[]; 
  projectLead?: any;
  additionalParticipants?: number;
  // Add alertMessage prop if it's dynamic, otherwise define inside
  alertMessage?: string; 
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ 
  image, 
  title='',
  daysLeft, 
  skills, 
  participants=[], 
  additionalParticipants,
  projectLead,
  alertMessage = "Review and finalize tasks" // Default message from user's code
}) => {
  return (
    <div className={`space-y-0 border-l px-7  w-[300px] sticky top-5 `}>
      {/* Image with Alert Overlay */}
      <div className="relative mb-6">
        <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
          {image ? (
             <img src={image} alt={title} className='h-48 w-full object-cover' />
          ) : (
             <Image src={"/images/proj-placeholder.jpg"} alt={title || ''} layout="fill" objectFit="cover" />
          )}
        </div>
       
      </div>

      {/* Skills Required */}
      <div className="mb-8">
        <h3 className="text-lg text-[#001D69] font-bold mb-4">Skills Required</h3>
        <div className="flex flex-wrap gap-x-4">
          {skills?.map((skill, index) => (
            // Use SkillBadge component
            <SkillBadge key={index} name={skill} icon={skill[0]} />
          ))}
        </div>
      </div>

      {/* Participants */}
      <div>
        <h3 className="text-lg text-[#001D69] font-bold mb-4">Participants</h3>
        <ParticipantCard
          name={`${projectLead?.firstName} ${projectLead?.lastName}`}
          role={'Project Lead'}
          image={projectLead?.image}
        />
        {participants?.slice(0,2)?.map((participant, index) => (
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
                {participants?.slice(3).map((item:any, i) => (
                  <div key={`add-${i}`} className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                ))}
             </div>
             {participants?.length > 2 && <span className="text-sm text-gray-600">+{participants?.length - 3} more</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSidebar;

