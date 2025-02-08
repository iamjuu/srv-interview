import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Timeline = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const timelineData = [
    {
      year: "2012",
      title: "Established",
      description:
        "Lorem ipsum dolor sit amet, consetur sadip. Aliquam loremst sed neque ac vehicula rutrus.",
      dealerships: [],
    },
    {
      year: "2014",
      title: "Introduced Cooltech - Brand Water Cooler and Chillers",
      description: "Dealership : WHIRLPOOL , FRIGIDAIRE , MABE , BEKON , IGMA , BLUE STAR , GREE",
      dealerships: [
        "WHITE ROCK",
        "FRIGIDAIRE",
        "MABE",
        "BENON",
        "IGMA",
        "BLUE STAR",
        "GREE",
      ],
    },
    {
      year: "2015",
      title: "Started doing HVAC Projects - Labor Campus, Villas & more",
      description: "Dealership : WHIRLPOOL , FRIGIDAIRE , MABE , BEKON , IGMA , BLUE STAR , GREE",
      dealerships: ["SUPER GENERAL", "WESTPOINT"],
    },
    {
      year: "2016",
      title: "Introduced Cooltech - Brand Water Cooler and Chillers",
      description: "Dealership : WHIRLPOOL , FRIGIDAIRE , MABE , BEKON , IGMA , BLUE STAR , GREE",
      dealerships: [
        "WHITE ROCK",
        "FRIGIDAIRE",
        "MABE",
        "BENON",
        "IGMA",
        "BLUE STAR",
        "GREE",
      ],
    },
    {
      year: "2017",
      title: "Started doing HVAC Projects - Labor Campus, Villas & more",
      description: "Dealership : WHIRLPOOL , FRIGIDAIRE , MABE , BEKON , IGMA , BLUE STAR , GREE",
      dealerships: ["SUPER GENERAL", "WESTPOINT"],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === timelineData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? timelineData.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const slideWidth = 438; 
  const gapWidth = 20; 

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const handleScroll = () => {
      AOS.refresh(); 
    };
  
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      AOS.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12">
          <div>
            <p className="text-blue-600 text-sm uppercase tracking-wide mb-4">ACHIEVEMENTS</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Highlights of Our<br />Journey
            </h2>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <button onClick={prevSlide} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (slideWidth + gapWidth)}px)`,
              gap: '20px',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {timelineData.map((item, index) => (
              <div
                key={index}
                data-aos={index % 2 === 0 ? "fade-up" : "fade-down"} // Apply fade-up for even, fade-down for odd
                className={`flex-shrink-0 w-[438px] flex flex-wrap flex-col justify-between transition-all duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="flex flex-col gap-8 sm:gap-14 h-full">
                  <p className="text-lg sm:text-xl">{item.year}</p>
                  <div
                    className={`border rounded-[15px] p-6 sm:p-10 border-black flex-grow ${
                      index === 1 || index === 2 ? "bg-black text-white" : ""
                    }`}
                  >
                    <div className="flex gap-2 items-end">
                      <div className="flex flex-col items-center relative">
                        <div className="flex flex-col items-center absolute bottom-[1px]">
                          <div className="w-[2px] h-16 sm:h-24 bg-black" />
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-black" />
                        </div>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold">{item.title}</p>
                    </div>
                    <p className="text-sm sm:text-base mt-4">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
