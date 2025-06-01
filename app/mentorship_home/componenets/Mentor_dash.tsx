import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MentorDashboard = () => {
  return (
    <div className="">
    
      {/* Title and Subtitle */}
      <div className="text-center mb-12 px-3 max-w-[800px] mx-auto">

        {/* Updated heading size: Removed text-9xl and md:text-4xl, applied text-4xl consistently */}
        <h2 className="text-4xl font-medium mb-5 text-[#1b3c91]">Lead with Purpose. Mentor with Sqwads.</h2>
        <p className="text-gray-600 text-lg mt-4">
        Share your knowledge, inspire rising talent, and grow as a leader — where your experience meets real impact.
        </p>
      </div>

      <div className="flex justify-center">
            <Link href={"/"}>
                <button className="bg-[#001D69] text-white px-8 py-3 mb-8 rounded flex items-center hover:bg-[#002a86] transition-colors">
                  Become a Mentor
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
            </Link>
           
          </div>

      {/* Image Section */}
      <div className="flex justify-center mb-12 px-3">
        <Image
          src="/images/mentors.png" // Ensure this path is correct in your project
          alt="Mentorship"
          width={800}
          height={400}
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default MentorDashboard;

