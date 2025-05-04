
import React from 'react';

// Define shared interfaces here

export interface KeyFeature {
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  // Use React.ReactNode | string for flexibility as used in SkillBadge
  icon: React.ReactNode | string; 
}

export interface Participant {
  name: string;
  role: string;
  image?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  type: string;
  duration: string;
  description: string;
  image?: string;
  startDay: number;
  endDay: number;
  daysLeft: number;
  overview: string;
  keyFeatures: KeyFeature[];
  skills: Skill[]; // Use the Skill interface defined here
  participants: Participant[]; // Use the Participant interface defined here
  additionalParticipants: number;
}

// Add other shared types/interfaces as needed

