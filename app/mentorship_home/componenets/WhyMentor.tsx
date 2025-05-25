import React from 'react';
import Image from 'next/image';

const WhyMentorSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Why Mentor on Sqwads? - Top Left */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Mentor on Sqwads?
            </h2>
            <p className="text-gray-600">
              It's more than giving back, it's growing forward. 
              As a Sqwads mentor, you don't just support 
              others, you elevate yourself too.
            </p>
          </div>

          {/* Grow Your Leadership Skills - Top Middle */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-4">
              <Image 
                src="/images/grow.png" 
                alt="Growth Icon" 
                width={40} 
                height={40}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Grow Your Leadership Skills
            </h3>
            <p className="text-gray-600 text-sm">
              Mentoring helps sharpen your communication, empathy, and decision 
              making - all key traits of great leaders.
            </p>
          </div>

          {/* Expand Your Network - Top Right */}
          <div className="bg-pink-50 p-6 rounded-lg">
            <div className="mb-4">
              <Image 
                src="/images/globe.png" 
                alt="Globe Icon" 
                width={40} 
                height={40}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Expand Your Network
            </h3>
            <p className="text-gray-600 text-sm">
              Connect with other mentors, rising tech talents, and project teams across industries.
            </p>
          </div>

          {/* Real Impact to Your Portfolio - Bottom Left */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="mb-4">
              <Image 
                src="/images/bag.png" 
                alt="Briefcase Icon" 
                width={40} 
                height={40}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Real Impact to Your Portfolio
            </h3>
            <p className="text-gray-600 text-sm">
              Showcase your mentorship experience and the real-world projects you've guided 
              — proof of your leadership in action.
            </p>
          </div>

          {/* Shape the Next Generation - Bottom Middle */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="mb-4">
              <Image 
                src="/images/star.png" 
                alt="Star Icon" 
                width={40} 
                height={40}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Shape the Next Generation
            </h3>
            <p className="text-gray-600 text-sm">
              Be the person you wish you had; guiding new talents, building their confidence, and 
              preparing them for real-world success.
            </p>
          </div>

          {/* Flexibility That Fits Your Life - Bottom Right */}
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="mb-4">
              <Image 
                src="/images/calendar.png" 
                alt="Calendar Icon" 
                width={40} 
                height={40}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Flexibility That Fits Your Life
            </h3>
            <p className="text-gray-600 text-sm">
              Mentor on your terms — choose when and how often you want to support a project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMentorSection;
