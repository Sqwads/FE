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
      smallImage: "/images/small.png",
    },
    {
      number: 2,
      text: "Get Matched to Projects",
      description:
        "Explore a variety of projects that align with your skills and interests, from technical roles to non-technical areas.",
      image: "/images/how-1.png", 
      smallImage: "/pop-up.png",
    },
    {
      number: 3,
      text: "Gain Mentorship & Build Your Portfolio",
      description:
        "Work on real projects under the guidance of an experienced mentor, receiving valuable feedback to improve your work and build a strong portfolio.",
      image: "/images/how-3.png", 
      smallImage: "/pop-up-1.png", 
    },
  ];

  const [activeStep, setActiveStep] = useState(0); // Default to the first step

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      {/* "To Get Started" Button */}
      <div className="mb-8">
        <button className="bg-purple-100 text-purple-700 py-2 px-4 rounded-full font-medium hover:bg-purple-200 transition duration-300">
          ⚡ TO GET STARTED
        </button> 
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-8">
        How Sqwads works <br />
        <span className="text-blue-600">in 3 steps</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* Left Column: Steps */}
        <div>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => setActiveStep(index)}
              >
                <div
                  className={`flex items-center justify-center h-12 w-12 rounded-full text-white text-xl font-bold ${
                    index === activeStep ? "bg-blue-600" : "bg-gray-400"
                  }`}
                >
                  {step.number}
                </div>
                <p
                  className={`text-lg font-medium ${
                    index === activeStep ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column: Images */}
        <div className="relative flex justify-center">
          <Image
            src={steps[activeStep].image}
            alt={`Illustration of ${steps[activeStep].text}`}
            width={400}
            height={400}
            className="w-full max-w-sm md:max-w-md lg:max-w-lg"
          />
          {/* Small image overlay */}
          <Image
            src={steps[activeStep].smallImage}
            alt="Additional information icon"
            width={100}
            height={100}
            className="absolute -bottom-8 right-8 shadow-lg rounded-lg"
          />
        </div>

        {/* Right Column: Description */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            {steps[activeStep].text}
          </h3>
          <p className="mt-4 text-lg text-gray-600">
            {steps[activeStep].description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default How;
