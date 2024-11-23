import Image from "next/image";
import React from "react";

const Learn = () => {
  const progressValue = 14; // Example progress level

  return (
    <section className="bg-white py-16 px-8 lg:px-16">
      {/* Container */}
      <div className="max-w-7xl mx-auto space-y-16">
        {/* First Section: Header + Intro */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800">
              Learn by Doing: <br />
              <span className="text-blue-600">Real Projects, Real Impact</span>
            </h2>
          </div>
          <div className="lg:w-1/2 mt-6 lg:mt-0">
            <p className="text-gray-600 text-lg">
              At Sqwads, we believe the best way to grow is through hands-on
              experience. Dive into real-world projects across tech and non-tech
              fields—like software development, marketing, and project
              management.
            </p>
          </div>
        </div>

        {/* Second Section: Image + Description */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Column: Image */}
          <div className="relative lg:w-1/2">
            <Image
              src="/learn.png"
              alt="People collaborating on a project for educational development"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
            {/* Progress Bar Overlay */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md flex items-center space-x-4">
              <p className="text-sm font-medium text-gray-700">
                Completion Level
              </p>
              <div className="w-32 h-2 bg-gray-300 rounded-full">
                <div
                  className="h-2 bg-red-500 rounded-full"
                  style={{ width: `${progressValue}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Column: Article */}
          <div className="lg:w-1/2 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Build a Web Application for an Educational Platform
            </h3>
            <p className="text-gray-600 text-lg">
              Design and develop a seamless, user-friendly web application that
              enhances learning experiences, streamlines content delivery, and
              empowers educators and students to connect and grow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Learn;
