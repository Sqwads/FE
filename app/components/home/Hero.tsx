import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../../../app/globals.css";
import hero from '../../../public/images/hero-image.png';

const Hero = () => {
  return (
    <section 
      className="flex flex-col items-center justify-center px-6 w-full text-white rounded-xl relative"
    >
      {/* Centered Content */}
      <div className="flex flex-col items-center text-center gap-6 max-w-2xl">
        <h1 className=" text-[2.5rem] text-[#F5F5F5] font-bold">
          Bridge the Gap Between  <br /><span className="text-[#4900A5]">Learning</span> <span className="text-[#4900A5]">and Doing</span>
        </h1>

        <p className="lg:text-xm text-[#D5D7DA]">
          Transform your skills into practical experience by working on open-source projects <br /> with guidance from industry experts.
        </p>

        <button className="h-30 flex items-center text-white rounded-md bg-[#0234B8] py-3 px-6 hover:bg-blue-700 transition duration-300">
          Learn More <FaLongArrowAltRight size={23} className="ml-2 animate-bounce w-6 h-6" />
        </button>
      </div>

      {/* Hero Image Container */}
      <div className="w-full max-w-5xl relative mt-20">
        {/* Sparkle Image */}
        <div className="absolute -top-8 -left-8 z-10">
          <Image
            src='/images/Sparkle_2.png'
            alt="sparkle"
            width={50}
            height={50}
          />
        </div>

        {/* Hero Image */}
        <Image 
          src={hero}
          alt="hero"
          className="rounded-lg shadow-lg w-full"
        />
      </div>

      {/* Background Design */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-dark_blue to-black opacity-50 -z-10"></div>
    </section>
  );
};

export default Hero;