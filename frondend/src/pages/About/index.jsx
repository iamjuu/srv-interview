import React, { useEffect } from "react";
import { Watch1, Watch2, Watch3, Watch4 } from "../../Assets";
import AOS from "aos";
import "aos/dist/aos.css";

const About = [
  { id: 1, img: Watch1 },
  { id: 2, img: Watch2 },
  { id: 3, img: Watch3 },
  { id: 4, img: Watch4 },
  { id: 5, img: Watch1 },
];

const AboutPage = () => {
  // useEffect(() => {
  //   AOS.init({ duration: 2000, once: false });

  //   const handleScroll = () => {
  //     AOS.refresh();
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     AOS.destroy();
  //   };
  // }, []);
  return (
    <div className="min-h-screen mt-24">
      <div className="px-8 max-w-7xl mx-auto">
        <div className="mb-4">
          <p className="text-blue-300  text-[28px] uppercase tracking-wide">
            ABOUT US
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div data-aos="fade-up">
            {" "}
            {/* Fade up animation */}
          
          </div>

          <div className="relative" data-aos="fade-up">
            <p className="text-gray-600 text-[18px] leading-relaxed mb-8">
              Elevate your wristwear with the [Brand/Model] Watch, designed for
              those who demand more from their timepieces. Whether you’re
              heading to the office or out on an adventure, this watch combines
              timeless elegance with cutting-edge functionality.
            </p>
          </div>
        </div>

        <div className="flex justify-end mb-8" data-aos="fade-up">
          <button className="group  px-2 py-1 rounded-full border ">
            more
          </button>
        </div>
      </div>

      {/* Infinite Carousel */}
      <div className="w-full py-8 overflow-hidden relative">
        <div
          className="flex items-center gap-4 animate-scroll hover:pause-scroll"
          style={{
            animationDuration: "20s",
          }}
        >
          {About.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] flex-shrink-0 p-4 rounded-lg shadow-lg"
              data-aos="flip-left"
            >
              <img
                src={item.img}
                alt={`About ${item.id}`}
                className="w-[300px] h-auto object-cover rounded-md"
              />
            </div>
          ))}
          {/* Duplicate Items */}
          {About.map((item) => (
            <div
              key={`duplicate-${item.id}`}
              className="min-w-[300px] flex-shrink-0 p-4 rounded-lg shadow-lg"
              data-aos="flip-left"
            >
              <img
                src={item.img}
                alt={`Duplicate About ${item.id}`}
                className="w-[300px] h-auto object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-scroll {
            display: flex;
            animation: scroll linear infinite;
          }

          .hover\\:pause-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
};

export default AboutPage;
