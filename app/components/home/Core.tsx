import Image from "next/image";
import React from "react";
import { FaUsers, FaRocket, FaLightbulb, FaHandsHelping } from "react-icons/fa";

const values = [
  {
    title: "Collaboration",
    description: "We unite talents and businesses to create a synergy that sparks innovation.",
    icon: <FaUsers className="text-2xl text-blue-600" />,
  },
  {
    title: "Innovation",
    description: "We turn ideas into impactful solutions that address real market needs.",
    icon: <FaLightbulb className="text-2xl text-blue-600" />,
  },
  {
    title: "Growth",
    description: "We enable individuals to refine their skills and empower businesses to evolve through fresh perspectives.",
    icon: <FaRocket className="text-2xl text-blue-600" />,
  },
  {
    title: "Inclusivity",
    description: "We celebrate diverse backgrounds, recognizing that a broad mix of experiences fosters true creativity.",
    icon: <FaHandsHelping className="text-2xl text-blue-600" />,
  },
];

const CoreValues = () => {
  return (
    <section className="py-16 px-6 w-full"> {/* Increased vertical padding */}
      <div className="mx-auto max-w-screen-2xl">
        {/* Significantly increased internal padding here */}
        <div className="bg-blue-50 rounded-xl p-10 sm:p-12 md:p-16 shadow-sm"> {/* p-10 → p-16 */}
          
          {/* Mobile Header - with increased padding */}
          <div className="md:hidden mb-10"> {/* Increased mb-8 → mb-10 */}
            <div className="flex items-start justify-between">
              <h2 className="text-3xl text-gray-900">
                Core <span className="text-blue-600 font-semibold">Values</span>
              </h2>
              <Image 
                src="/images/Sparkle.png" 
                alt="Sparkle" 
                width={48} 
                height={20}
                className="mt-1"
              />
            </div>
            <p className="text-gray-700 mt-6"> {/* Increased mt-4 → mt-6 */}
              Be part of a global movement reshaping skill acquisition, career advancement, and business innovation.{" "}
              <strong className="font-semibold text-gray-900">Join Us!</strong>
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-16"> {/* Increased gaps */}
            
            {/* Desktop Header - with increased padding */}
            <div className="hidden md:block md:w-5/12">
              <div className="flex items-start gap-4"> {/* Increased gap-3 → gap-4 */}
                <h2 className="text-4xl mb-8 pr-20 text-gray-900"> {/* Increased mb-5 → mb-8, pr-16 → pr-20 */}
                  Core <br /> <span className="text-blue-600 font-semibold">Values</span>
                </h2>
                <Image 
                  src="/images/Sparkle.png" 
                  alt="Sparkle" 
                  width={72}
                  height={28}
                  className="mt-2"
                />
              </div>
              <p className="text-gray-700 mt-8 leading-relaxed"> {/* Increased mt-4 → mt-8 */}
                Be part of a global movement reshaping skill acquisition, career advancement, and business innovation.{" "}
                <strong className="font-semibold text-gray-900">Join Us!</strong>
              </p>
            </div>

            {/* Values Grid - with increased spacing */}
            <div className="md:w-7/12 grid grid-cols-1 gap-8 sm:grid-cols-2"> {/* Increased gap-6 → gap-8 */}
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-5 p-5 sm:p-0"> {/* Increased gap-4 → gap-5, p-4 → p-5 */}
                  <div className="bg-white p-4 rounded-lg shadow-xs"> {/* Increased p-3 → p-4 */}
                    {value.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900"> {/* Increased text-lg → text-xl */}
                      {value.title}
                    </h3>
                    <p className="text-gray-700 text-base mt-2"> {/* Increased text-sm → text-base, mt-1 → mt-2 */}
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;