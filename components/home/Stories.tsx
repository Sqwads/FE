"use client";
import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Testimonial {
  name: string;
  title: string;
  description: string;
  image: string;
}

const Stories = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Alex",
      title: "Alex’s Journey in Data Analysis",
      description:
        "After completing a data analysis certification, Alex struggled to find a job without experience. Through Sqwads, Alex worked on a project analyzing data for a non-profit, gaining valuable skills and feedback from mentors. With a completed project in his portfolio, Alex landed his first job confidently showcasing his work.",
      image: "/images/alex.png",
    },
    {
      name: "Sarah",
      title: "Sarah’s Marketing Portfolio",
      description:
        "Sarah transitioned from education to marketing with practical experience. She joined Sqwads projects for real startups, building a solid portfolio and landing a role as a digital marketer.",
      image: "/images/sarah.png",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="bg-white py-8 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-8 text-left">
        <button className="bg-purple-100 text-purple-700 py-1 px-3 rounded-full font-medium hover:bg-purple-200 transition">
          TESTIMONIALS
        </button>
        <h2 className="text-4xl font-bold text-gray-900 mt-4">
          Stories from <br />
          <span className="text-blue-600">Sqwad Graduates</span>
        </h2>
      </div>

      {/* Testimonials */}
      <div className="relative flex flex-col items-center">
        {/* Testimonial Cards */}
        <div className="relative flex items-center justify-center overflow-hidden w-full">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-700 ease-in-out ${
                index === activeIndex
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-90 z-0"
              } w-full max-w-3xl px-8 flex items-center space-x-8`}
            >
              {/* Image Section */}
              <div className="flex-shrink-0">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover border border-gray-300 shadow-lg"
                />
              </div>

              {/* Text Section */}
              <div className="text-left">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {testimonial.title}
                </h3>
                <p className="mt-4 text-sm text-gray-600">
                  {testimonial.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center w-full max-w-sm mt-6">
          <button
            className="text-blue-600 hover:text-blue-800 transition p-2"
            onClick={handlePrev}
          >
            <FiChevronLeft size={30} />
          </button>
          <button
            className="text-blue-600 hover:text-blue-800 transition p-2"
            onClick={handleNext}
          >
            <FiChevronRight size={30} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              } transition`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;
