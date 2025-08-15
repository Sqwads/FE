import React from 'react';
import { MdOutlineWavingHand } from 'react-icons/md';

interface Props {
  userName: string;
}

export default function WelcomeMessage({ userName }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold flex items-center">
        Great to see you again, {userName}
        <MdOutlineWavingHand className="ml-2 text-yellow-400" />
      </h1>
      <p className="text-gray-500">"The only way to do great work is to love what you do."</p>
    </div>
  );
}