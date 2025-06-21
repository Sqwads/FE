"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';
import AssessmentHeader from '../components/AssessmentHeader';
// Removed react-icons import

const AssessmentStartPage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    // Navigate to the first question page
    // router.push('/assessment/question/1'); 
    console.log("Navigating to assessment questions...");
  };

  const testScopeItems = [
    "User Understanding",
    "Design Principles",
    "User Empathy",
    "Prototyping and testing",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-9xl mx-auto">
        <div className="text-center md:text-left">
          <AssessmentHeader />
        </div>

        {/* Main Content Card */}
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Left Column - Details */}
            <div className="w-full md:w-1/3 space-y-5">
              <div className="flex items-center gap-3">
                {/* Replaced FiBarChart2 with img tag */}
                <Image
                  src="/images/bar-chart.png"
                  alt="Type icon"
                  width={30}
                  height={20}
                  className="h-5 w-5 flex-shrink-0"

                />
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-medium text-gray-700">General Based Assesment</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Replaced FiClock with img tag */}
                <Image
                  src="/images/duration.png"
                  alt="Duration icon"
                  width={30}
                  height={20}
                  className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="font-medium text-gray-700">10 minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Replaced FiGlobe with img tag */}
                <Image
                  src="/images/FlagFilled.png"
                  alt="Language icon"
                  width={30}
                  height={20}
                  className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Language</p>
                  <p className="font-medium text-gray-700">English</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Replaced FiTrendingUp with img tag */}
                <Image
                  src="/images/trending-up.png"
                  alt="Level icon"
                  width={30}
                  height={20}
                  className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Level</p>
                  <p className="font-medium text-gray-700">Basic</p>
                </div>
              </div>
            </div>

            {/* Right Column - Summary, Scope, Instructions */}
            <div className="w-full md:w-2/3">
              {/* Summary */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary of the UI/UX Design test</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  This UI/UX Design test assesses your knowledge of fundamental design processes and your ability to understand user needs. The test consists of 30 multiple-choice questions to be completed within 10 minutes. Your performance will be used to create a profile, which will be ranked among other Sqwad UI/UX Design users only if you choose to make your results public.
                </p>
              </div>

              {/* Test Scope */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Test Scope</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {testScopeItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {/* Replaced FiCheckCircle with img tag */}
                      <Image
                        src="/images/VerifiedFilled.png"
                        alt="Checkmark icon"
                        width={30}
                        height={20}
                        className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Test Instructions */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Test Instructions</h2>
                <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                  <p>
                    Do not switch tabs or open other applications during the test. The system monitors tab switching and may flag your session if this occurs.
                  </p>
                  <p>
                    This test is timed, with 10 minutes to complete 30 multiple-choice questions. A timer will display the remaining time. Plan accordingly to answer all questions within the allotted time.
                  </p>
                  <p>
                    Refreshing the test page may cause your progress to be lost. Please avoid reloading or closing the test window.
                  </p>
                  <p>
                    Once the timer runs out, your responses will be automatically submitted. Make sure to manage your time effectively to answer all questions.
                  </p>
                </div>
              </div>

              {/* Agreement and Button */}
              <div>
                <p className="text-xs text-gray-500 mb-3">
                  By starting the test, you agree to adhere to these rules. Good luck!
                </p>
                <Link href='/assessment/assess-que-page'>
                  <button
                    onClick={handleGetStarted}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#001D69] text-white rounded-md hover:bg-blue-800 transition-colors text-sm font-medium"
                  >
                    Get Started <FaLongArrowAltRight size={23} className="ml-2 animate-bounce w-6 h-6" />
                  </button>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentStartPage;

