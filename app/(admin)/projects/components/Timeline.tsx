'use client';

import React from 'react';

interface TimelineProps {
  startDate: string;
  endDate: string;
  progress?: number; // 0-100
}

const Timeline: React.FC<TimelineProps> = ({
  startDate,
  endDate,
  progress = 50
}) => {
  return (
    <div className="rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#001D69]">TIMELINE</h3>
        {/* <button className="text-[#001D69] text-sm hover:underline">Edit</button> */}
      </div>
      
      <hr className="my-4 border-gray-100" />
      
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-[#000000]">Start Date:</p>
            <p className="text-[#16181B]">{startDate}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-[#F53225]">End Date:</p>
              <p className="text-[#16181B]">{endDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
