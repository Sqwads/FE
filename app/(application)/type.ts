export interface KeyFeature {
    title: string;
    description: string;
  }
  
  export interface Skill {
    name: string;
    icon: string; // Or a more specific type if you have predefined icons
  }
  
  export interface Participant {
    name: string;
    role: string;
    image: string;
  }
  
  export interface ProjectData {
    id: string;
    title: string;
    type: string;
    duration: string;
    description: string;
    image?: string; // Optional as it's in ProjectSidebar
    startDay: number;
    endDay: number;
    daysLeft: number;
    overview: string;
    keyFeatures: KeyFeature[];
    skills: Skill[];
    participants: Participant[];
    additionalParticipants: number;
  }
  
  