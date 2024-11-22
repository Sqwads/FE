import Image from 'next/image';

const How = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      {/* "To Get Started" Button */}
      <div className="mb-8">
        <button className="bg-purple-100 text-purple-700 py-2 px-4 rounded-full font-medium hover:bg-purple-200 transition">
          ⚡ TO GET STARTED
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left Column: Steps */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            How Sqwads works <span className="text-blue-600">in 3 steps</span>
          </h2>
          <div className="mt-8 space-y-6">
            {[
              { number: 1, text: "Sign up to build your profile" },
              { number: 2, text: "Get Matched to Projects" },
              { number: 3, text: "Gain Mentorship & Build Your Portfolio" },
            ].map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div
                  className={`flex items-center justify-center h-12 w-12 rounded-full text-white text-xl font-bold ${
                    index === 0 ? "bg-blue-600" : "bg-gray-400"
                  }`}
                >
                  {step.number}
                </div>
                <p
                  className={`text-lg font-medium ${
                    index === 0 ? "text-gray-900" : "text-gray-500"
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
            src="/how.png"
            alt="How Sqwads Works"
            width={400} // Define width in pixels
            height={400} // Define height in pixels
            className="w-full max-w-md lg:max-w-none"
          />
          {/* Small image overlay */}
          <Image
            src="/small.png"
            alt="Additional Info"
            width={112} // Width for the small image
            height={112} // Height for the small image
            className="absolute -bottom-8 right-8 shadow-lg rounded-lg"
          />
        </div>

        {/* Right Column: Description */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Sign up to build your profile
          </h3>
          <p className="mt-4 text-lg text-gray-600">
            Choose your role—Student, Career Switcher, or Mentor—and customize your profile with skills and interests to access tailored projects and connections.
          </p>
        </div>
      </div>
    </section>
  );
};

export default How;
