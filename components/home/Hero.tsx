import Image from "next/image"
import { FaLongArrowAltRight } from "react-icons/fa"

const Hero = () => {
  return (
    <section 
      className=" flex flex-col lg:flex-row items-center justify-between align-item-center
          px-6 py-10 lg:px-12 lg:py-6 gap-y-5 w-full bg-blue-950 text-white rounded-xl">

      {/* {Left Content} */}
      <div className="flex flex-col items-start gap-6 max-w-xl">

        <h1 className="lg:text-[3rem] text-[2.3rem] text-[#F5F5F5] font-medium leading-snug">
          Bridge the Gap Between <span className="text-light_blue">Learning</span> and <span className="text-light_blue">Doing</span>
        </h1>

        <p className="lg:text-lg text-base text-[#D5D7DA] mb-5">
          Transform your skills into practical experience by working on open-source projects with guidance from industry experts.
        </p>

        <button className="h-30 flex items-center text-white rounded-md  bg-blue-600 py-3 px-6">
          Learn More <FaLongArrowAltRight size={23} className="ml-2" />
        </button>
      </div>

      {/* Right Content */}
      <div className="relative flex items-center justify-center w-full max-w-md lg:max-w-xl">
        <Image 
          src="/images/hero-image.png"
          alt="hero"
          width={500}
          height={370}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Background Design */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-dark_blue to-black opacity-50 -z-10"></div>

    </section>
  )
}

export default Hero
