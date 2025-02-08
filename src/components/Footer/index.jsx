import React, { useEffect } from "react";
import { FooterLogo } from "../../Assets";
import AOS from "aos"; // Ensure you import AOS
import "aos/dist/aos.css"; // Ensure you import AOS styles
import Btn from "../arrowBtn"
import {Arrow,Arrowbtn} from "../../Assets"
import { MoveUpRight } from "lucide-react";

const Footer = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000, once: false });

    const handleScroll = () => {
      AOS.refresh(); // Refresh AOS to ensure animations are triggered on scroll
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener and destroy AOS when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
      AOS.destroy(); // Proper cleanup to prevent memory leaks
    };
  }, []);

  return (
    <footer className="p-10 bg-[#15212D] text-white flex flex-col">
      {/* Top Section */}
      <div className="mb-8  text-center lg:text-left">
        <h1 className="text-[40px] lg:text-[60px] leading-tight">
          Ready to Experience Superior <br className="hidden lg:block" /> Cooling?
        </h1>
        <div className="mt-4 flex justify-center lg:justify-start items-center gap-3">
          {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Let’s Talk
          </button> */}
          <Btn icon={<MoveUpRight size={20}  />}  btnname={`LET'S TALK` } className={' border border-white py-2 px-2 rounded-full flex gap-2 justify-center items-center'}/>
          <p className="text-[24px] font-[400] text-[#E4E4E4] underline">info@cooltech.com</p>
          </div>
      </div>

      {/* Middle Section */}
      <div className="w-full  flex flex-wrap lg:flex-nowrap gap-6">
        {/* Left Column */}
        <div className="flex flex-col justify-center   gap-3 w-full lg:w-1/2 text-center lg:text-left">
          <img className="w-[120px] mx-auto lg:mx-0" src={FooterLogo} alt="Footer Logo" />
          <p className="text-sm lg:text-base">
            Lorem Ipsum is simply dummy text of the printing <br /> and typesetting
            industry. Lorem Ipsum has been the industry
          </p>
        </div>

        {/* Right Column */}
        <div className="flex flex-wrap justify-between w-full lg:w-1/2 text-center lg:text-left gap-6">
          {/* Quick Links */}
          <div className=" w-1/3">
            <ul className="flex justify-center   flex-col gap-2">
              <li className="text-[20px] text-[#E4E4E4] font-semibold">Quick Links</li>
              <li className="hover:text-blue-400 text-[#C9C9C9] text-[18px] cursor-pointer">Home</li>
              <li className="hover:text-blue-400 text-[18px] text-[#C9C9C9] cursor-pointer">About Us</li>
              <li className="hover:text-blue-400 text-[18px] text-[#C9C9C9] cursor-pointer">Services</li>
            </ul>
          </div>
          {/* Explore */}
          <div>
            <ul className="flex flex-col gap-2">
              <li className=" text-[20px] text-[#E4E4E4] font-semibold">Explore</li>
              <li className="hover:text-blue-400 text-[18px] text-[#C9C9C9] cursor-pointer">Products</li>
              <li className="hover:text-blue-400 text-[18px] text-[#C9C9C9] cursor-pointer">Gallery</li>
              <li className="hover:text-blue-400 text-[18px] text-[#C9C9C9] cursor-pointer">Blog</li>
            </ul>
          </div>
          {/* Info */}
          <div>
            <ul className="flex flex-col gap-2">
              <li className="text-[20px] text-[#E4E4E4] font-semibold">Info</li>
              <li className="hover:text-blue-400 text-[18px] text-[#C9C9C9] cursor-pointer">Contact Us</li>
              <li className="hover:text-blue-400 text-[18px] text-[#C9C9C9] cursor-pointer">Privacy Policy</li>
              <li className="hover:text-blue-400 text-[18px] text-[#C9C9C9] cursor-pointer">Terms of Service</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 flex flex-wrap justify-between items-center gap-4">
        {/* Social Links */}
        <div className="w-full lg:w-auto text-center">
          <ul className="flex justify-center lg:justify-start gap-4 text-sm">
            <li className="hover:text-blue-400 text-[#E4E4E4] cursor-pointer">INSTAGRAM</li>
            <li className="hover:text-blue-400 text-[#E4E4E4] cursor-pointer">FACEBOOK</li>
            <li className="hover:text-blue-400  text-[#E4E4E4] cursor-pointer">TWITTER</li>
            <li className="hover:text-blue-400 text-[#E4E4E4]  cursor-pointer">PINTEREST</li>
          </ul>
        </div>
        {/* Copyright */}
        <div className="w-full lg:w-auto text-center ">
          <p className="text-xs text-[text-[#E4E4E4]] lg:text-sm">
            Copyright © 2024 Cooltech. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
