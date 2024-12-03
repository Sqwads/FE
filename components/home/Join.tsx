"use client";
import Image from "next/image";

const Join = () => {
  return (
    <section className="bg-blue-50 py-16 px-8 md:py-24 md:px-16 lg:py-32 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Text Section */}
      <div className="max-w-2xl text-center md:text-left">
        <h2 className="text-gray-900 text-3xl md:text-4xl font-medium leading-snug">
          Ready to Gain Real-World Experience? <br />
          <span className="text-[rgba(22,24,27,1)]">
            Start Building Your Portfolio Today!
          </span>
        </h2>
        <button className="bg-blue-600 text-white my-6 py-3 px-6 md:py-4 md:px-8 rounded-lg font-medium hover:bg-blue-700 transition">
          Join Sqwads &rarr;
        </button>
      </div>

      {/* Image Section */}
      <div className="w-full max-w-xs md:max-w-sm lg:max-w-md flex justify-center md:justify-end">
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <Image
            src="/images/student.png"
            alt="Student with laptop"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Join;
