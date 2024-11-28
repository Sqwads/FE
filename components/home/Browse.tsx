"use client";
import Image from "next/image";

const Browse = () => {
  return (
    <section className="py-20 px-10 md:py-28 md:px-16 lg:py-32 lg:px-24 flex items-center justify-between">
      {/* Left Image */}
      <div className="relative w-full max-w-md md:max-w-lg lg:max-w-2xl">
        <Image
          src="/images/browse.png" // Replace with your image path
          alt="Handshake"
          width={800}
          height={600}
          className="object-cover rounded-lg"
        />
      </div>

      {/* Right Content */}
      <div className="max-w-lg ml-8 space-y-6">
        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
          Hire Talents with <br />
          <span className="text-blue-600">Real-World Experience</span>
        </h2>
        <p className="text-lg text-gray-700">
          Sqwads provides employers with access to skilled, work-ready candidates who have completed real projects with industry-standard feedback. Review their portfolios to find talent that’s ready to make an impact.
        </p>
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition">
          Browse Portfolios &rarr;
        </button>
      </div>
    </section>
  );
};

export default Browse;
