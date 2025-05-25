import React from 'react';
import Image from 'next/image';

const HowItWorksSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-16">
          How Mentoring on Sqwads<br />
          Works in 3 Simple Steps
        </h2>
        
        <div className="relative">
          {/* Progress line */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl z-10 border-4 border-white">
                  1
                </div>
                <div className="flex-grow border-t border-gray-200 mt-6 ml-4 hidden md:block"></div>
              </div>
              <div className="flex items-start">
                <div className="text-blue-600 mr-4">
                  <Image 
                    src="/images/document.png" 
                    alt="Document Icon" 
                    width={24} 
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Sign up to join
                  </h3>
                  <p className="text-gray-600">
                    Tell us about your experience, interests, and availability.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-start mb-6">
                <div className="hidden md:block flex-grow border-t border-gray-200 mt-6 mr-4"></div>
                <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xl z-10 border-4 border-white">
                  2
                </div>
                <div className="flex-grow border-t border-gray-200 mt-6 ml-4 hidden md:block"></div>
              </div>
              <div className="flex items-start">
                <div className="text-pink-600 mr-4">
                  <Image 
                    src="/images/link.png" 
                    alt="Link Icon" 
                    width={24} 
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Get Matched with a Project
                  </h3>
                  <p className="text-gray-600">
                    We'll connect you with a team where your skills are needed most.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-start mb-6">
                <div className="hidden md:block flex-grow border-t border-gray-200 mt-6 mr-4"></div>
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xl z-10 border-4 border-white">
                  3
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-teal-600 mr-4">
                  <Image 
                    src="/images/bulb.png" 
                    alt="Chat Icon" 
                    width={24} 
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Start Mentoring
                  </h3>
                  <p className="text-gray-600">
                    Join check-ins, review work, and offer feedback — all in a flexible way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
