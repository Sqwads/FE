import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../../../app/globals.css";
import hero from '../../../public/images/hero-image.png';
import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="flex flex-col items-center justify-center lg:px-6 px-3 w-full text-white rounded-xl relative"
    >
      {/* Centered Content */}
      <div className="flex flex-col lg:items-center lg:text-center tracking-tighter px-3 max-w-[]">
        <div className="mb-7">
          <div className=" lg:text-[3.3rem] leading-[2.7rem] lg:leading-[3rem]  text-[2.2rem]  text-[#F5F5F5] font-medium">
            Bridge the Gap Between {" "}
            <span className="bg-gradient-to-r inline lg:hidden bg-clip-text text-transparent lg:mt-[-1rem] from-[#D6E1FF] via-[#C379FF] to-[#5080FF] lg:text-[3rem]  text-[2.2rem] font-semibold tracking-tighter">
              Learning and doing
            </span>
          </div>
          <div className="bg-gradient-to-r hidden lg:block bg-clip-text text-transparent  from-[#D6E1FF] via-[#C379FF] to-[#5080FF] lg:text-[3rem]  text-[2.4rem] font-semibold tracking-tighter">
            Learning and doing
          </div>
        </div>

        <div className="lg:text-xl text-base text-[#D5D7DA] lg:leading-[2rem] mb-10">
          Transform your skills into practical experience by working on open-source projects <br /> with guidance from industry experts.
        </div>
      <Link href='#how'>
          <button className="flex w-fit items-center text-white rounded-md bg-[#0234B8] border border-[#5483FF] lg:py-3 py-2 lg:text-base text-sm px-6 hover:bg-blue-700 transition duration-300">
              Learn More <FaLongArrowAltRight size={23} className="ml-2 animate-bounce w-6 h-6" />
            </button>
      </Link>
       
      </div>

      {/* Hero Image Container */}
      <div className="w-full max-w-5xl relative mt-20">
        {/* Sparkle Image */}
        <div className="absolute lg:-top-8 -top-10 lg:-left-20 -left-[-17rem] z-10">
          <img
            src='/images/Sparkle_2.png'
            alt="sparkle"
            className="lg:h-14 h-10 object-cover w-20"
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