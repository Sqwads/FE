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
      <button className="bg-purple-100 text-purple-700 py-1 px-3 rounded-full font-semibold tracking-wide text-xs hover:bg-purple-200 transition">
           TESTIMONIALS
        </button>

           <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mt-4">
                  Stories from <br />
          <span className="text-blue-600">Sqwad Graduates</span>
        </h2>

      </div>

      {/* Testimonials */}
      <div className="relative flex flex-col justify-center items-center">
        {/* Testimonial Cards */}
        <div className="flex overflow-hidden w-[70%] items-end justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-500 transform ${
                index === activeIndex
                  ? "translate-x-0 opacity-100 scale-100"
                  : "translate-x-full opacity-0 scale-90"
              } flex-shrink-0 w-full max-w-4xl flex items-center space-x-6`}
            >
              {/* Image Section */}
              <div className="flex-shrink-0">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Text Section */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {testimonial.title}
                </h3>
                <p className="mt-4 text-sm w-[60%] text-gray-600">
                  {testimonial.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center w-full max-w-md mt-6">
          <button
            className="text-blue-600 hover:text-blue-800 transition"
            onClick={handlePrev}
          >
            <FiChevronLeft size={30} />
          </button>

          <button
            className="text-blue-600 hover:text-blue-800 transition"
            onClick={handleNext}
          >
            <FiChevronRight size={30} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center items-center mt-4 space-x-2 pb-6">
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
