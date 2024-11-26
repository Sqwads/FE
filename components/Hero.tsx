import Image from "next/image"
import Button from "./Button"

const Hero = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between align-item-center
     px-6 py-6 lg:px-12 lg:py-6 max-container w-full bg-blue-950 text-white rounded-xl">

      {/* {Left Content} */}
      <div className="flex flex-col items-start gap-6 max-w-lg">

        <h1 className="text-[2.8rem] text-[#F5F5F5] font-medium leading-snug">
          Bridge the Gap Between <span className="text-light_blue">Learning</span> and <span className="text-light_blue">Doing</span>
        </h1>

        <p className="text-lg text-[#D5D7DA]">
          Transform your skills into practical experience by working on open-source projects with guidance from industry experts.
        </p>

        <Button 
          type="button"
          title="Learn More"
          variant="blue"
          icon="/arrow.svg"
        />
      </div>

      {/* Right Content */}
      <div className="relative flex items-center justify-center w-full max-w-md lg:max-w-xl">
        <Image 
          src="/images/hero-image.png"
          alt="hero"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Background Design */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-dark_blue to-black opacity-50 -z-10"></div>

    </section>
  )
}

export default Hero
