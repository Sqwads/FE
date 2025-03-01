import Image from "next/image";
import React from "react";

const Learn = () => {
  return (
    <section className="bg-[#F9FDFF] py-16 px-8 lg:px-16">
      {/* Container */}
      <div className="max-w-6xl mx-auto space-y-16">
        {/* First Section: Header + Intro */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Left Column: Header */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-medium text-gray-800">
              Learn by Doing: <br />
              <span className="text-blue-600 underline">Real Projects, Real Impact</span>
            </h2>
          </div>
          {/* Right Column: Intro Text */}
          <div className="lg:w-1/2">
            <p className="text-gray-600 lg:text-lg">
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
              src="/images/learn.png"
              alt="People collaborating on a project for educational development"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>

          {/* Right Column: Article */}
          <div className="lg:w-1/2 space-y-4">
            <h3 className="text-3xl font-semibold text-gray-800">
              Build a Web Application for an Educational Platform
            </h3>
            <p className="text-gray-600 lg:text-lg">
              Design and develop a seamless, user-friendly web application that
              enhances learning experiences, streamlines content delivery, and
              empowers educators and students to connect and grow.
            </p>
          </div>
        </div>

        {/* Third Section: Article + Image (Reversed Layout) */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
          {/* Right Column: Image */}
          <div className="relative lg:w-1/2">
            <Image
              src="/images/analyze.png"
              alt="Person analyzing data on multiple monitors"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>

          {/* Left Column: Article */}
          <div className="lg:w-1/2 space-y-4">
            <h3 className="text-3xl font-semibold text-gray-800">
              Analyze Data for a Non-Profit to Drive Better Decisions
            </h3>
            <p className="text-gray-600 text-lg">
              Leverage data insights to support impactful decision-making,
              optimize resources, and enhance the effectiveness of programs,
              helping the non-profit achieve its mission.
            </p>

            {/* Explore More Projects Link */}
            <a
              href="/projects"
              className="text-blue-600 underline font-medium flex items-center hover:underline"
            >
              Explore more projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Learn;