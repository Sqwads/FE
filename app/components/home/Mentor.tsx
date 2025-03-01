import Image from 'next/image';
import React from 'react';

const Mentor = () => {
  return (
    <div className="py-20 ">
    

      {/* Title and Subtitle */}
      <div className="text-center mb-12 max-w-[700px] mx-auto">
        <button className="bg-purple-600 text-white rounded-full px-6 py-2 uppercase text-sm mb-7">
          Learn From the Best
        </button>
        <h2 className="text-3xl md:text-4xl font-medium mb-5 text-[#1b3c91]">Get Mentored by Industry Experts</h2>
        <p className="text-gray-600 text-base  mt-4">
          Our mentors are here to guide you with feedback and advice aligned with industry
          standards. Learn from those who know the field and are eager to help you grow.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex justify-center mb-12 px-3">
        <Image
          src="/images/mentors.png"
          alt="Mentorship"
          width={800}
          height={400}
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>

        {/* Carousel Section */}
    <div className="lg:w-[80%] mx-auto px-4">
      <div className="overflow-x-auto flex gap-4 pb-4 justify-center">
        {/* Card 1 */}
        <div className="w-[300px] bg-white shadow-md rounded-lg p-4 flex-shrink-0 min-h-[220px] flex flex-col justify-between">
          <p className="text-gray-600 text-sm mb-2">
          My mentee quickly grasped the importance of clean, scalable code and efficient database management. By breaking down backend architecture and API design into manageable steps, they’ve developed the skills needed to build robust systems that can handle real-world challenges.
          </p>
          <div>
            <h3 className="text-md font-semibold">Saad Bashar</h3>
            <p className="text-blue-600 font-medium text-xs">Backend Developer</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-[300px] bg-white shadow-md rounded-lg p-4 flex-shrink-0 min-h-[220px] flex flex-col justify-between">
          <p className="text-gray-600 text-sm mb-2">
          Guiding my mentee through the complexities of user-centered design has been incredibly rewarding. By simplifying concepts like wireframing, prototyping, and usability testing, I’ve seen them grow in confidence and transforming complex ideas into intuitive design solutions.
          </p>
          <div>
            <h3 className="text-md font-semibold">Yusuf Olowode</h3>
            <p className="text-blue-600 font-medium text-xs">Product Designer</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-[300px] bg-white shadow-md rounded-lg p-4 flex-shrink-0 min-h-[220px] flex flex-col justify-between">
          <p className="text-gray-600 text-sm mb-2">
          Watching my mentee master front-end technologies, from HTML to advanced JavaScript frameworks, has been a joy. Through hands-on projects, they’ve learned to craft seamless user experiences, ensuring that every line of code not only works but delights the user.
          </p>
          <div>
            <h3 className="text-md font-semibold">Chukwuma Chidinma</h3>
            <p className="text-blue-600 font-medium text-xs">Frontend Developer</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="w-[300px] bg-white shadow-md rounded-lg p-4 flex-shrink-0 min-h-[220px] flex flex-col justify-between">
          <p className="text-gray-600 text-sm mb-2">
          As a product manager, my role was to help my mentee understand how to balance strategy, customer needs, and team collaboration. By teaching them how to prioritize features, manage stakeholder expectations, and define clear roadmaps....
          </p>
          <div>
            <h3 className="text-md font-semibold">Josephine Uzor</h3>
            <p className="text-blue-600 font-medium text-xs">Product Manager</p>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
};

export default Mentor;
