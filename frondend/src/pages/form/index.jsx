import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Form } from "../../Assets";
const CoolingUpgradeForm = () => {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: [],
    enquiry: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Form})`,
      }}
      className="flex flex-col lg:flex-row gap-5 pt-10 min-h-screen lg:h-[662px] justify-center items-center p-4 lg:p-0 bg-cover bg-center bg-blend-overlay"
    >
      <div
        data-aos="fade-down"
        className="flex flex-col justify-center w-full lg:w-[40%] space-y-4 p-4 lg:p-0"
      >
        <p className="text-white text-sm">Get in touch now</p>
        <h1 className="text-white text-4xl lg:text-6xl">
          Ready to Upgrade Your Cooling?
        </h1>
        <p className="text-white text-base">
          Tellus rutrum tellus pellentesque eu. Sagittis purus sit amet
          volutpat. Sed ullamcorper tellus rutrum tellus pellentesque eu.
          Sagittis purus sit
        </p>
        <button className="flex items-center gap-2 text-white p-2 rounded-full bg-[#15212D] w-fit">
          View more <ArrowRight size={15} />
        </button>
      </div>

      <div
        data-aos="fade-up"
        className="w-full lg:w-[40%] rounded-[10px] bg-white shadow-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5 p-6 lg:p-14">
          <p className="flex gap-2 items-center">Let's Connect</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="bg-gray-100 p-3 rounded w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Enter your mail"
              className="bg-gray-100 p-3 rounded w-full"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <input
            type="tel"
            placeholder="Enter your Phone Number"
            className="w-full bg-gray-100 p-3 rounded"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <div className="flex flex-wrap gap-4">
            {["Purchase", "Installation", "Services"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="type"
                  value={type}
                  checked={formData.type.includes(type)}
                  onChange={(e) => {
                    const newType = e.target.checked
                      ? [...formData.type, e.target.value]
                      : formData.type.filter((t) => t !== e.target.value);
                    setFormData({ ...formData, type: newType });
                  }}
                  className="w-4 h-4 text-black border-gray-300 rounded-sm focus:ring-0"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          <textarea
            placeholder="Enquiry"
            rows="4"
            className="w-full bg-gray-100 p-3 rounded resize-none"
            value={formData.enquiry}
            onChange={(e) =>
              setFormData({ ...formData, enquiry: e.target.value })
            }
          />

          <button
            type="submit"
            className="inline-flex items-center border border-gray-900 text-gray-900 px-6 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
          >
            SEND MESSAGE <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoolingUpgradeForm;
