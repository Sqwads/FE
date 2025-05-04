'use client';

import { customColors } from '../../../../src/common/data';
import React from 'react';

interface Skill {
  name: string;
  color: string;
}

interface SkillsRequiredProps {
  skills: any[];
  onEdit?: () => void;
}

const SkillsRequired: React.FC<SkillsRequiredProps> = ({
  skills,
  onEdit
}) => {


  return (
    <div className="rounded-2xl p-6 ">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#001D69]">SKILLS REQUIRED</h3>
        <button 
          onClick={onEdit}
          className="text-[#001D69] text-sm hover:underline"
        >
          Edit Skills
        </button>
      </div>
      
      <hr className="my-4 border-gray-100" />
      
      {skills?.map((item:any, idx:number)=>
       <div className="mb-4">
          <h4 className="font-medium mb-2">{item?.name}</h4>
          <div className="flex flex-wrap gap-x-1 gap-y-2">
            {item?.tools?.map((skill:any, idx:number) => (
              <span 
                key={idx} 
                className={`px-2 py-2 text-xs rounded-lg flex items-center`}
                style={{
                    background: customColors[idx % customColors.length].light,
                    color:  customColors[idx % customColors.length].deep,
                    border: `1px solid ${ customColors[idx % customColors.length].deep}`
                }}
              >
                {skill}
                {/* <button className="ml-1 text-xs">×</button> */}
              </span>
            ))}
          </div>
        </div>
      )}
     
    
    </div>
  );
};

export default SkillsRequired;
