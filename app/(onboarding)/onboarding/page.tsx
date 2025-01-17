"use client"
import Image from 'next/image';
import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';

const OnboardingStage_1 = () => {
  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between items-center w-[80%]">
        {/* Left Section */}
        <div className="flex flex-col items-start text-left lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Let’s Know You Better
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Select your preferences so we can set up the space just for you.
          </p>

          <Image
            src="/images/knowing_better.png"
            alt="knowing_better"
            width={500}
            height={250}
            className="rounded-md"
          />
        </div>

        {/* Right Section */}
        <div className="bg-white shadow-md rounded-lg p-20 lg:w-1/2 w-full h-[600px] flex flex-col justify-between">
          {/* Progress Tracker */}
          <div className="mb-10">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Step 1 of 3</span>
              <span>Onboarding</span>
            </div>
            <div className="relative w-full bg-gray-200 h-2 rounded-full mt-3">
              <div className="absolute top-0 left-0 h-2 bg-blue-800 rounded-full" style={{ width: '33%' }}></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              What is the number one thing you want to do on Sqwads?
            </h3>
            <h6 className="text-sm text-gray-500 mb-8">Select at least one option</h6>
          </div>

          {/* Checkbox Options */}
          <div className="space-y-6 mb-10">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Find Projects</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Connect with Mentors</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Build Portfolio</span>
            </label>
          </div>

          {/* Continue Button */}
          <button className="flex items-center justify-center bg-blue-800 text-white px-8 py-4 rounded-md hover:bg-blue-900 w-full">
            Continue <FaLongArrowAltRight className="ml-2" />
          </button>
        </div>

      </section>
    </>
  );
};

export default OnboardingStage_1;
