import Image from 'next/image';
import React from 'react';

export default function OnBoardingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-5 md:px-10 px-3"
      style={{ backgroundImage: 'url("/images/signup_bg.png")' }}
    >
      {/* Top Section */}
      <div className="flex w-full md:mb-0 mb-7">
        <div className="flex-1">
          <Image
            src="/images/signup_1.png"
            alt="Sqwads Logo"
            width={50}
            height={50}
          />
        </div>

        {/* Close Icon */}
        <div className="">
          <button className="text-gray-500 hover:text-gray-700 text-lg">
            {/* Add close functionality if required */}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:w-[80%] mx-auto">
        {/* Left Section (Shared Across All Pages) */}
        <div className="flex flex-col items-start text-left lg:w-1/2 lg:block hidden mb-10 lg:mb-0">
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

        {/* Dynamic Content */}
        <div className="lg:w-1/2 w-full">{children}</div>
      </div>

      {/* Footer */}
      <div className="text-center mt-5 w-full text-xs text-gray-400">
        Sqwads · Terms · Privacy · Copyright © 2024 | Sqwads
      </div>
    </div>
  );
}
