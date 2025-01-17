import Image from 'next/image';
import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';

const WelcomePage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Card Container */}
        <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
          {/* Icon */}
          <div className="mb-6">
            <Image
              src="/images/success.png"
              alt="success"
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Aboard
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-gray-600 mb-6">
            You’re all set! Your onboarding is now complete, and you’re ready to explore all the amazing opportunities ahead.               </p>

          {/* Button */}
          <button className="flex items-center w-full justify-center bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900">
            Proceed <FaLongArrowAltRight className="ml-2" />
          </button>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
