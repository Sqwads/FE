"use client";

import React from 'react';
import Image from 'next/image';
import { formatTextToSentenceCase } from '@/common';

// Define TypeScript interfaces for component props
interface ParticipantCardProps {
  name: string;
  role: string;
  image?: string;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ name, role, image }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3 flex-shrink-0">
        {image ? (
          <Image src={image} alt={name} width={40} height={40} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-medium">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div>
        <h4 className="font-medium text-sm sm:text-base">{name}</h4>
        {role && <p className="text-sm text-blue-600">{formatTextToSentenceCase(role)}</p>}
      </div>
    </div>
  );
};

export default ParticipantCard;

