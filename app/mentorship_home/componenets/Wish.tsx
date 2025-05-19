import React from 'react';
import Link from 'next/link';

const FinalCTASection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-blue-50 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left content */}
            <div className="p-8 md:p-12 md:w-1/2">
              <h2 className="text-3xl font-bold text-[#001D69] mb-2">
                Wish you had a Mentor?
              </h2>
              <h3 className="text-3xl font-normal text-blue-300 mb-6">
                Now you can be one.
              </h3>
              <p className="text-gray-600 mb-8 max-w-xl">
                Be the guide you once needed — share your journey, lift rising 
                talents, and grow while giving back. Join Sqwads as a mentor.
              </p>
              <Link 
                href="#" 
                className="inline-flex items-center bg-[#001D69] text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-colors"
              >
                Become a mentor
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            {/* Right decorative area */}
            <div className="md:w-1/2 relative">
              {/* Blue gradient background - this simulates the abstract blue shapes in the design */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 opacity-50"></div>
              
              {/* You can replace this with an actual image if you have one */}
              <div className="h-full w-full min-h-[200px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
