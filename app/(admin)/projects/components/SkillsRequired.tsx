'use client';

import React from 'react';

interface Skill {
  name: string;
  color: string;
}

interface SkillsRequiredProps {
  skills: Skill[];
  onEdit?: () => void;
}

const SkillsRequired: React.FC<SkillsRequiredProps> = ({
  skills,
  onEdit
}) => {
  // Function to determine background and text color based on skill color
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'pink':
        return 'bg-pink-100 text-pink-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'orange':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#001D69]">SKILLS REQUIRED</h3>
        <button 
          onClick={onEdit}
          className="text-#001D69 text-sm hover:underline"
        >
          Edit Skills
        </button>
      </div>
      
      <hr className="my-4 border-gray-100" />
      
      <div className="mt-2">
        <h4 className="font-medium mb-2">Product Designer</h4>
        <div className="flex flex-wrap gap-2">
          {skills.filter(skill => ['Adobe XD', 'UI Design', 'Figma', 'Sketch'].includes(skill.name)).map((skill, index) => (
            <span 
              key={index} 
              className={`${getColorClasses(skill.color)} px-3 py-2 text-sm rounded-lg flex items-center`}
            >
              {skill.name}
              <button className="ml-1 text-xs">×</button>
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium mb-2">Developers</h4>
        <div className="flex flex-wrap gap-2">
          {skills.filter(skill => ['HTML', 'CSS', 'JavaScript', 'Git'].includes(skill.name)).map((skill, index) => (
            <span 
              key={index} 
              className={`${getColorClasses(skill.color)} px-3 py-1 text-sm rounded-lg flex items-center`}
            >
              {skill.name}
              <button className="ml-1 text-xs">×</button>
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium mb-2">Product Managers</h4>
        <div className="flex flex-wrap gap-2">
          {skills.filter(skill => ['Trello', 'Jira', 'User Flow', 'Product'].includes(skill.name)).map((skill, index) => (
            <span 
              key={index} 
              className={`${getColorClasses(skill.color)} px-3 py-1 text-sm rounded-lg flex items-center`}
            >
              {skill.name}
              <button className="ml-1 text-xs">×</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsRequired;
