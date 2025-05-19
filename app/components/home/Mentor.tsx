import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Mentor = () => {
  return (
    <div className="py-20 ">
    
      {/* Title and Subtitle */}
      <div className="text-center mb-12 px-3 max-w-[700px] mx-auto">
        <button className="border border-[#9900C7] text-white rounded-md px-6 py-2 uppercase text-sm mb-7">
        <span className="bg-gradient-to-r from-[#001D69] via-[#7C96DB] via-[#9900C7] to-[#FF00FB] bg-clip-text text-transparent">Learn From the Best</span> 🥰
          
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
          {/* <div className="w-[300px] bg-white shadow-md rounded-lg p-4 flex-shrink-0 min-h-[220px] flex flex-col justify-between">
            <p className="text-gray-600 text-sm mb-2">
            My mentee quickly grasped the importance of clean, scalable code and efficient database management. By breaking down backend architecture and API design into manageable steps, they've developed the skills needed to build robust systems that can handle real-world challenges.
            </p>
            <div>
              <h3 className="text-md font-semibold">Saad Bashar</h3>
              <p className="text-blue-600 font-medium text-xs">Backend Developer</p>
            </div>
          </div> */}

          {/* Card 2 */}
          {/* <div className="w-[300px] bg-white shadow-md rounded-lg p-4 flex-shrink-0 min-h-[220px] flex flex-col justify-between">
            <p className="text-gray-600 text-sm mb-2">
            Guiding my mentee through the complexities of user-centered design has been incredibly rewarding. By simplifying concepts like wireframing, prototyping, and usability testing, I've seen them grow in confidence and transforming complex ideas into intuitive design solutions.
            </p>
            <div>
              <h3 className="text-md font-semibold">Yusuf Olowode</h3>
              <p className="text-blue-600 font-medium text-xs">Product Designer</p>
            </div>
          </div> */}

          {/* Card 3 */}
          {/* <div className="w-[300px] bg-white shadow-md rounded-lg p-4 flex-shrink-0 min-h-[220px] flex flex-col justify-between">
            <p className="text-gray-600 text-sm mb-2">
            Watching my mentee master front-end technologies, from HTML to advanced JavaScript frameworks, has been a joy. Through hands-on projects, they've learned to craft seamless user experiences, ensuring that every line of code not only works but delights the user.
            </p>
            <div>
              <h3 className="text-md font-semibold">Chukwuma Chidinma</h3>
              <p className="text-blue-600 font-medium text-xs">Frontend Developer</p>
            </div>
          </div> */}

          {/* Card 4 */}
          {/* <div className="w-[300px] bg-white shadow-md rounded-lg p-4 flex-shrink-0 min-h-[220px] flex flex-col justify-between">
            <p className="text-gray-600 text-sm mb-2">
            As a product manager, my role was to help my mentee understand how to balance strategy, customer needs, and team collaboration. By teaching them how to prioritize features, manage stakeholder expectations, and define clear roadmaps....
            </p>
            <div>
              <h3 className="text-md font-semibold">Josephine Uzor</h3>
              <p className="text-blue-600 font-medium text-xs">Product Manager</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Mentorship Call-to-Action Section */}
      <div className="py-16 px-4 relative overflow-hidden mt-16">
        {/* Left Quote Image - Repositioned to be closer to content */}
        <div className="absolute left-[10%] md:left-[15%] bottom-[20%] z-0">
          <Image 
            src="/images/left-coolicon.png" 
            alt="Left quote" 
            width={120} 
            height={120}
            className="opacity-30" // Lighter appearance to match reference
          />
        </div>
        
        {/* Right Quote Image - Repositioned to be closer to content */}
        <div className="absolute right-[10%] md:right-[15%] top-[20%] z-0">
          <Image 
            src="/images/top-coolicon.png" 
            alt="Right quote" 
            width={120} 
            height={120}
            className="opacity-30" // Lighter appearance to match reference
          />
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          {/* Badge/Pill */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="bg-white border border-purple-400 rounded-full px-4 py-1 text-sm flex items-center">
              {/* Badge Icon - Replace with your local image */}
              <div className="mr-1 flex items-center">
                <Image 
                  src="/images/woman-icon.png" 
                  alt="Badge icon" 
                  width={16} 
                  height={16}
                />
              </div>
              <span>FLEX YOUR <span className="bg-gradient-to-r from-[#001D69] via-[#7C96DB] via-[#9900C7] to-[#FF00FB] bg-clip-text text-transparent font-medium">LEADERSHIP</span>, BE A MENTOR</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-semibold text-[#001D69] mb-6">
            Want to guide the next tech talent?
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Join Sqwads to mentor aspiring talents, guide real projects, and 
            grow a stronger tech ecosystem.
          </p>
          
          {/* Read More Button */}
          <div className="flex justify-center">
            <Link href={"/mentorship_home"}>
                <button className="bg-[#001D69] text-white px-8 py-3 rounded flex items-center hover:bg-[#002a86] transition-colors">
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
            </Link>
           
          </div>
        </div>
      </div>

    </div>
  );
};

export default Mentor;
