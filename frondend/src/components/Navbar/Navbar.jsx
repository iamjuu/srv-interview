import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MoveUpRight, Bell } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from 'sweetalert2';  // Add this import
import RegisterButton from '../arrowBtn';
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const Navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const notificationbtn = () => {
    const status = localStorage.getItem('subscriptionStatus');
    console.log(status, 'subscription status');

    if (status === 'true') {
      Navigate('/notification')
      // Swal.fire({
      //   position: 'top-end',
      //   icon: 'success',
      //   title: 'Subscription Successful!',
      //   toast: true,
      //   showConfirmButton: false,
      //   timer: 3000,
      //   timerProgressBar: true,
      //   didOpen: (toast) => {
      //     toast.addEventListener('mouseenter', Swal.stopTimer)
      //     toast.addEventListener('mouseleave', Swal.resumeTimer)
      //   }
      // });
    }
  };

  return (
    <nav>
      <div
        className="container mx-auto px-6 py-4 flex items-center justify-between"
        data-aos="fade-down"
      >
        <div className="flex items-center">
          <h1>logo</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-500" data-aos="fade-up">
            Home
          </Link>
          <Link to="/settings" className="text-gray-600 hover:text-blue-500" data-aos="fade-up">
            Settings
          </Link>
          <button onClick={notificationbtn} className="text-gray-600 hover:text-blue-500">
            <Bell />
          </button>

          <RegisterButton
            btnname="Log Out"
            icon={<MoveUpRight size={18} />}
            onClick={handleLogout}
            className="hidden lg:flex items-center justify-center border p-2 gap-2 rounded-full transition-colors duration-200 hover:bg-red-500 hover:text-white"
          />
        </div>

        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" data-aos="fade-up">
          <div className="flex flex-col space-y-2 px-6 py-4">
            <Link to="/" className="text-black hover:text-blue-500">
              HOME
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-500">
              ABOUT
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-blue-500">
              SERVICES
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-500">
              PRODUCTS
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-blue-500">
              BLOG
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-500">
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;