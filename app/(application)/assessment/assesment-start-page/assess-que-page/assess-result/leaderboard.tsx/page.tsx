import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import AssessmentHeader from '@/app/(application)/components/AssessmentHeader';

const Leaderboard: NextPage = () => {
  // Sample data for the leaderboard
  const leaderboardData = [
    { id: 1, name: 'Adewale Taofeeq', score: '28 / 30' },
    { id: 2, name: 'Adewale Taofeeq', score: '28 / 30' },
    { id: 3, name: 'Adewale Taofeeq', score: '28 / 30' },
    { id: 4, name: 'Adewale Taofeeq', score: '28 / 30' },
    { id: 5, name: 'Adewale Taofeeq', score: '28 / 30' },
    { id: 6, name: 'Adewale Taofeeq', score: '28 / 30' },
    { id: 7, name: 'Adewale Taofeeq', score: '28 / 30' },
    { id: 8, name: 'Adewale Taofeeq', score: '28 / 30' },
    { id: 9, name: 'Adewale Taofeeq', score: '28 / 30' },
    { id: 10, name: 'Adewale Taofeeq', score: '28 / 30' },
  ];

  return (
    <div className="max-w-8xl mx-auto p-6 font-sans">

        <AssessmentHeader />
      <h2 className="text-xl font-Semibold text-yellow-500 mb-2">VIEW LEADERBOARD</h2>
      <p className="text-gray-600 mb-6">See how you rank among other Sqwad members.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {leaderboardData.map((user) => (
          <div key={user.id} className="bg-gray-100 rounded-lg p-5 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-800 text-lg">{user.name}</h3>
              <p className="text-gray-600 mt-1">Score: {user.score}</p>
            </div>
            <div className="relative">
              <div className="bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold">
                A
              </div>
              <div 
                className="absolute -bottom-1 -right-1 rounded-full w-7 h-7 flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: user.id % 2 === 0 ? '#F59E0B' : '#F97316' }}
              >
                {user.id}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Results
        </Link>
      </div>
    </div>
  );
};

export default Leaderboard;
