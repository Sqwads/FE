import Image from "next/image";
import { BsPersonVcard } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { RiLightbulbLine } from "react-icons/ri";

const Value = () => {
  return (
    <section>
      {/* First Section - Benefits */}
      <div className="bg-[#EFF1FB] lg:py-16 py-7">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center">
            <button
              className="bg-purple-100 border border-[#001D69] text-purple-700 py-2 px-4 rounded-md font-medium hover:bg-purple-200 transition duration-300">
              Benefits 🥰
            </button>
            <h2 className="mt-4 text-3xl font-medium text-[#1b3c91] sm:text-4xl">
              Value Proposition
            </h2>
          </div>

          {/* Cards Section */}
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col  bg-gray-50 p-8 rounded-lg  border border-[#dfdede]">

              <RiLightbulbLine className="text-indigo-600 mb-5" size={35} />

              <h3 className="text-2xl font-medium  text-[#1b3c91]">
                Hands-On Experience
              </h3>
              <p className="mt-4 text-gray-500 ">
                Work on real projects to develop practical skills.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col  bg-gray-50 p-8 rounded-lg  border border-[#dfdede]">
              <LuUsers className="text-indigo-600 mb-5" size={35} />
              <h3 className="text-2xl font-medium  text-[#1b3c91]">
                Mentorship
              </h3>
              <p className="mt-4 text-gray-500 ">
                Guidance from industry professionals to thrive.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col  bg-gray-50 p-8 rounded-lg  border border-[#dfdede]">
              <BsPersonVcard className="text-indigo-600 mb-5" size={35} />
              <h3 className="text-2xl font-medium text-[#1b3c91]">
                Portfolio Building
              </h3>
              <p className="mt-4 text-gray-500 ">
                Showcase your completed projects to impress recruiters.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-3 lg:px-8">
          <div className="relative xl:flex items-center">
            {/* Image Section */}
            <div className="xl:w-[60%] xl:mb-0 mb-7">
              <Image
                src="/images/mission.jpg"
                alt="Mission"
                width={50}
                height={50}
                className="w-full h-[500px] xl:h-[750px] object-cover rounded-3xl"
              />
            </div>

            {/* Text Section */}
            <div className="xl:w-[40%] xl:-ml-10 relative z-10">
              <div className="bg-blue-900 text-white p-10 rounded-3xl shadow-lg">
                <h3 className="text-2xl  mb-6">
                  <span className="text-[#9BB7FF]">Mission: </span>To empower Africa&apos;s aspiring professionals with open-source projects and hands-on learning opportunities.
                </h3>
                <p className="text-sm leading-relaxed">
                  At Sqwads, we believe in the power of collaboration and community.
                  We bridge the gap between learning and doing by connecting students, interns, and career-transitioning individuals to open-source projects. We empower users to build projects, refine their skills, and enhance their employability, preparing them for success in a fast-paced tech landscape.
                </p>
                <p className="mt-4 text-sm font-medium">
                  Join us in shaping the future of technology, one project at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>




    </section>
  );
};

export default Value;
