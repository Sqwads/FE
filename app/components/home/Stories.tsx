"use client";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

interface Testimonial {
  name: string;
  title: string;
  description: string;
  image: string;
}

const Stories = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Alex",
      title: "Alex’s Journey in Data Analysis",
      description:
        "After completing a data analysis certification, Alex struggled to find a job without experience. Through Sqwads, Alex worked on a project analyzing data for a non-profit, gaining valuable skills and feedback from mentors. With a completed project in his portfolio, Alex landed his first job confidently showcasing his work.",
      image: "/images/alex.png",
    },
    {
      name: "Sarah",
      title: "Sarah’s Marketing Portfolio",
      description:
        "Sarah transitioned from education to marketing with practical experience. She joined Sqwads projects for real startups, building a solid portfolio and landing a role as a digital marketer.",
      image: "/images/sarah.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let sliderRef:any = useRef(null)
  const next = () => {
    
    sliderRef?.slickNext();
  };
  const previous = () => {
  
    sliderRef?.slickPrev();
  };





  return (
    <section className="bg-white py-8 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-8 text-left">
        <button className="bg-purple-100 text-purple-700 py-1 px-3 rounded-full font-medium hover:bg-purple-200 transition">
          TESTIMONIALS
        </button>
        <h2 className="text-4xl font-medium text-gray-900 mt-4">
          Stories from <br />
          <span className="text-blue-600">Sqwad Graduates</span>
        </h2>
      </div>


      <Slider 
       ref={slider => {
          sliderRef = slider;
        }}
        {...settings}>
      {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={` rounded-lg lg:max-w-[500px] mr-4 xl:max-w-[650px] bg-[#0000001A] flex h-96 lg:h-72`}
          >
             <div className="flex items-center   h-full">
           
              <div className="w-2/5 flex-1 h-full">
                <Image 
                  className="w-full h-full object-cover rounded-lg" 
                  src={testimonial.image}
                   alt=""
                   width={100}
                   height={50}
                   />
              </div>
 
              <div className="  w-3/5 px-4 py-3">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {testimonial.title}
                </h3>
                <p className="mt-4 text-sm text-gray-600">
                  {testimonial.description}
                </p>
              </div>

             </div>
          </div>
          ))}

      </Slider>
      {/* Testimonials */}
      <div className="relative flex flex-col items-center">
       

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center w-full max-w-sm ">
          <button
            className="text-blue-600 hover:text-blue-800 transition p-2"
            onClick={previous}
          >
            <FiChevronLeft size={30} />
          </button>
          <button
            className="text-blue-600 hover:text-blue-800 transition p-2"
            onClick={next}
          >
            <FiChevronRight size={30} />
          </button>
        </div>

       
      </div>
    </section>
  );
};

export default Stories;
