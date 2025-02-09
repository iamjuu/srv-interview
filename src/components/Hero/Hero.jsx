import React, { useEffect } from 'react';
import { Banner } from '../../Assets';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false }); 
  }, []);

  return (
    <div className="container mx-auto px-4  sm:px-6 md:px-12 lg:px-24">
      <div  className='w-full flex  justify-start items-start '>
      <div className="p-5 max-w-2xl  flex flex-col  sm:text-left" data-aos="fade-up">
        {/* Adjusted title font sizes */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-gray-900 font-bold leading-tight">
        luxury
        </h1>

        {/* Adjusted body text font sizes */}
        <p className="text-gray-600 mb-8 text-base sm:text-lg md:text-xl leading-relaxed">
          Lorem ipsum is simply dummy text of the printing and typesetting industry.
          Lorem ipsum is simply dummy text of the printing and typesetting industry.
        </p>

        <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center sm:justify-start">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-full flex items-center mb-4 sm:mb-0"
            data-aos="fade-up"
          >
         Explore
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            className="bg-white text-gray-800 px-6 py-3 rounded-full border border-gray-300 flex items-center"
            data-aos="fade-down"
          >
            EXPLORE OUR PRODUCTS
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
      </div>
      {/* AC Image */}
      <div className="flex justify-center mt-10" data-aos="fade-up">
        <img
          src={Banner}
          alt="Air Conditioner"
          className="rounded-lg w-full max-w-[1200px] h-auto object-cover shadow-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
