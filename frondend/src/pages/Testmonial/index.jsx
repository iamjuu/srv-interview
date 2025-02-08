import React, { useEffect } from "react";
import { Star } from "lucide-react";
import { Profile, Terminal } from "../../Assets";
import Btn from "../../components/arrowBtn";
import { MoveRight, MoveLeft } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const TestimonialsAndServices = () => {
  const testimonials = [
    {
      id: 1,
      name: "David Anderson",
      role: "Home Project Owner",
      text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since",
      rating: 5,
      image: Profile,
    },
    {
      id: 2,
      name: "Daniel Harris",
      role: "Product Manager",
      text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever",
      rating: 5,
      image: Profile,
    },
    {
      id: 3,
      name: "James Clark",
      role: "Project Management",
      text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever",
      rating: 5,
      image: Profile,
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      AOS.destroy();
    };
  }, []);

  return (
    <div className="w-full mt-10 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-12">
          <div>
            <p className="text-[#397DA8] text-[20px]">TESTIMONIALS</p>
          </div>
          <div className="w-full flex">
            <div className="w-[50%]">
              <h2 className="text-[60px] font-bold mb-4" data-aos="fade-up">
                Client Stories
              </h2>
              <p
                className="text-gray-600"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry. Lorem ipsum has been the industry
              </p>
            </div>

            <div className="flex justify-end gap-4 items-end w-[50%]">
              <Btn
                icon={<MoveLeft size={15} />}
                className="border border-black p-5 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 hover:bg-black hover:text-white"
              />
              <Btn
                icon={<MoveRight size={15} />}
                className="border border-black p-5 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 hover:bg-black hover:text-white"
              />
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#046FE20D] p-6 rounded-lg shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay={testimonial.id * 100}
            >
              <p className="text-[#716154] text-[18px] mb-6">
                {testimonial.text}
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-[16px]">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <div>
                  <p className="text-[16px] text-[#716154]">
                    Health Services Group
                  </p>
                </div>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AC Service Section */}
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={Terminal}
            alt="AC Maintenance"
            className="w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsAndServices;
