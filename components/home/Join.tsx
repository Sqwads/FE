"use client";
import Image from "next/image";

const Join = () => {
  return (
    <section className="bg-blue-50 py-20 px-10 md:py-28 md:px-16 lg:py-32 lg:px-24 flex items-center justify-between">
      <div className="max-w-2xl space-y-8">
        <p className="text-sm text-purple-600 font-medium uppercase tracking-wide">
          Ready to Gain Real-World Experience?
        </p>
        <h2 className="text-5xl font-bold text-gray-900 leading-tight">
          Start Building Your <br />
          <span className="text-blue-600">Portfolio Today!</span>
        </h2>
        <button className="bg-blue-600 text-white py-4 px-8 rounded-lg font-medium hover:bg-blue-700 transition">
          Join Sqwads &rarr;
        </button>
      </div>
      <div className="hidden md:block">
        <div className="relative w-72 h-72 lg:w-96 lg:h-96">
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
