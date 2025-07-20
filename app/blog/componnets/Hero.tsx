import { FaSearch } from "react-icons/fa";
import "../../../app/globals.css";

const BlogHero = () => {
  return (
    <section className="flex flex-col items-start justify-center lg:px-6 px-3 w-full text-white rounded-xl relative h-[60vh]"> 
      {/* Reduced height to 60vh to fit within parent's 70vh */}

      <div className="flex flex-col items-start text-left tracking-tighter px-3 max-w-4xl relative z-20">
        {/* Stay Up to Date Button */}
        <div className="mb-4 lg:mb-6"> {/* Reduced margin */}
          <button className="border border-[#9900C7] bg-black/15 backdrop-blur-sm text-purple-300 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[#9900C7]/15 hover:scale-105">
            ⚡ <span className="bg-gradient-to-r from-[#7C96DB] via-[#9900C7] to-[#FF00FB] bg-clip-text text-transparent font-bold">STAY UP TO DATE</span> 
          </button> 
        </div>
        
        {/* Main Title */}
        <div className="mb-4 lg:mb-6"> {/* Reduced margin */}
          <h1 className="lg:text-[3rem] leading-[2.5rem] lg:leading-[3.2rem] text-[2rem] text-white font-bold">
            The Sqwads Blog
          </h1>
        </div>

        {/* Description */}
        <div className="lg:text-lg text-base text-[#F5F7FA] lg:leading-[1.6rem] leading-[1.5rem] mb-8 max-w-3xl">
          Explore real project stories, career tips, user spotlights, and platform 
          <br className="hidden lg:block" /> 
          updates, all designed to help you grow and thrive in tech with 
          <span className="bg-gradient-to-r from-[#7C96DB] to-[#9900C7] bg-clip-text text-transparent font-bold"> Sqwads</span>.
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-lg">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search anything here..." 
              className="w-full px-4 py-3 pl-12 bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9900C7] focus:border-[#9900C7] transition-all duration-300 group-hover:bg-black/15"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;