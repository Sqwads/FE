"use client";
import { useState } from 'react';
import Image from 'next/image';

const How = () => {
  const steps = [
    {
      number: 1,
      text: "Sign up to build your profile",
      description:
        "Choose your role—Student, Career Switcher, or Mentor—and customize your profile with skills and interests to access tailored projects and connections.",
      image: "/images/how.png",
    },
    {
      number: 2,
      text: "Get Matched to Projects",
      description:
        "Explore a variety of projects that align with your skills and interests, from technical roles to non-technical areas.",
      image: "/images/how-1.png",
    },
    {
      number: 3,
      text: "Gain Mentorship & Build Your Portfolio",
      description:
        "Work on real projects under the guidance of an experienced mentor, receiving valuable feedback to improve your work and build a strong portfolio.",
      image: "/images/how-2.png",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="bg-white lg:py-1 py-7 px-6 md:px-12 lg:px-20">
      <div className="mb-8">
        <button className="bg-purple-100 text-purple-700 py-2 px-4 rounded-full font-medium hover:bg-purple-200 transition duration-300">
          ⚡ TO GET STARTED
        </button> 
      </div>

      <h2 className="text-4xl font-medium text-gray-900 md:text-4xl lg:mb-4">
        <div className='mb-2'>How Sqwads works</div> 
        <span className="text-blue-600">in 3 steps</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div>
          <div className="space-y-4 my-10 border-l-2 border-[#f0efef]">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`lg:pl-7 pl-3 ${index === activeStep && 'border-l-4 border-[#001D69] rounded'}`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`flex items-center space-x-4 cursor-pointer rounded-md py-2 px-2 ${index === activeStep && 'bg-[#F6F8FF]'}` }>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#F5F5F5] text-gray-900 text-xl font-bold">
                    {step.number}
                  </div>
                  <p className={`lg:text-lg text-base font-medium ${index === activeStep ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center">
          <Image
            src={steps[activeStep].image}
            alt={`Illustration of ${steps[activeStep].text}`}
            width={400}
            height={400}
            className="w-full max-w-sm md:max-w-md lg:max-w-lg relative"
          />
        </div>

        <div className='py-4'>
          <h3 className="text-2xl font-medium text-gray-900">
            {steps[activeStep].text}
          </h3>
          <p className="mt-4 text-base text-gray-600">
            {steps[activeStep].description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default How;