import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import CircularProgress from '../../components/CircularProgress';
import AssessmentHeader from '@/app/(application)/components/AssessmentHeader';
import Link from 'next/link';

const AssessmentResult: NextPage = () => {
  return (
    <div className="max-w-9xl mx-auto p-6 font-sans">

      <AssessmentHeader />

      <div className="border rounded-lg p-8 mb-6 shadow-sm">
        {/* Top Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Marks Scored Card */}
          <div className="border rounded-lg p-5 relative shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-700 text-lg">Marks Scored</h3>
                <div className="flex items-baseline mt-3">
                  <span className="text-4xl font-bold">25</span>
                  <span className="text-gray-500 ml-2 text-base">/ 30</span>
                </div>
              </div>
              <div className="bg-green-500 rounded-full p-2.5">
                {/* Replace with actual image when available */}
                <div className="w-7 h-7 text-white flex items-center justify-center">
                  {/* Image placeholder for checkmark */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <span className="text-sm text-gray-600">Publicize Performance</span>
              <div className="ml-auto">
                <div className="w-14 h-7 bg-green-200 rounded-full p-1 cursor-pointer">
                  <div className="bg-white w-5 h-5 rounded-full transform translate-x-7 shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Rank Card */}
          <div className="border rounded-lg p-5 relative shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-700 text-lg">Rank</h3>
                <div className="flex items-baseline mt-3">
                  <span className="text-4xl font-bold">115</span>
                  <span className="text-gray-500 ml-2 text-base">/ 202</span>
                </div>
              </div>
              <div className="bg-yellow-500 rounded-full p-2.5">
                {/* Replace with actual image when available */}
                <div className="w-7 h-7 text-white flex items-center justify-center">
                  {/* Image placeholder for medal */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 6a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm-1.5 3.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                    <path d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06L5.636 5.197a.75.75 0 010-1.06zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.591-1.591a.75.75 0 011.06 0zM16 9a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end">
              <Link href='/assessment/leaderboard.tsx'>
                <button className="text-yellow-500 text-sm flex items-center font-medium">
                  VIEW LEADERBOARD
                  <span className="ml-1">▼</span>
                </button>
              </Link>

            </div>
          </div>

          {/* Time Spent Card */}
          <div className="border rounded-lg p-5 relative shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-700 text-lg">Time Spent</h3>
                <div className="flex items-baseline mt-3">
                  <span className="text-4xl font-bold">09:15</span>
                  <span className="text-gray-500 ml-2 text-base">/ 10:00</span>
                </div>
              </div>
              <div className="bg-red-500 rounded-full p-2.5">
                {/* Replace with actual image when available */}
                <div className="w-7 h-7 text-white flex items-center justify-center">
                  {/* Image placeholder for clock */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-[#E9EEFF] rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-gray-700 mb-3 text-lg">Total Questions</h3>
              <p className="text-4xl font-bold text-blue-900">30</p>
            </div>
            <div>
              <h3 className="text-gray-700 mb-3 text-lg">Attempted</h3>
              <p className="text-4xl font-bold text-blue-900">30</p>
            </div>
            <div>
              <h3 className="text-gray-700 mb-3 text-lg">Unattempted</h3>
              <p className="text-4xl font-bold text-blue-900">0</p>
            </div>
            <div>
              <h3 className="text-gray-700 mb-3 text-lg">Number of Trials</h3>
              <p className="text-4xl font-bold text-blue-900">1</p>
            </div>
          </div>
        </div>

        {/* Circular Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-6">
          {/* Percentile */}
          <CircularProgress
            percentage={91.7}
            color="#ef4444"
            label="Percentile"
            rating="EXCELLENT"
          />

          {/* Accuracy */}
          <CircularProgress
            percentage={78}
            color="#3b82f6"
            label="Accuracy"
            rating="GOOD"
          />

          {/* Attempted */}
          <CircularProgress
            percentage={86.6}
            color="#ec4899"
            label="Attempted"
            rating="EXCELLENT"
          />
        </div>
      </div>

      <p className="text-gray-600 text-base">
        Don't worry if you don't meet the benchmark, you can retake the test once more after six months.
      </p>
    </div>
  );
};

export default AssessmentResult;
