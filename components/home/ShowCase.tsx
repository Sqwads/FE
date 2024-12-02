import Image from 'next/image';
import React from 'react';

const ShowCase = () => {
  return (
    <section className="bg-gray-50 py-16 px-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 max-w-6xl mx-auto">
        <div>
        <h2 className="text-4xl font-bold text-blue-600 leading-tight">
                Showcase Your Work <br />
            <span className="text-gray-800">Impress Employers</span>
          </h2>
        </div>

        {/* Small Image */}
        <div className="mb-4">
          <Image
            src="/woman-icon.png"
            alt="Icon between heading and text"
            width={40}
            height={40}
          />
        </div>

        <div className='lg:w-1/2'>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Build a portfolio that highlights your best projects, complete with mentor feedback and
                  real-world applications. Use Sqwads’ Portfolio Builder to create a shareable link or
                  download a professional portfolio PDF.
                </p>
        </div>

        
      </div>

      {/* Images Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center mt-12">
        {/* Left Image */}
        <div className="flex-shrink-0">
          <Image
            src="/portfolio.png"
            alt="Portfolio Screenshot 1"
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right Image */}
        <div className="flex-shrink-0">
          <Image
            src="/group.png"
            alt="Portfolio-group"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default ShowCase;
