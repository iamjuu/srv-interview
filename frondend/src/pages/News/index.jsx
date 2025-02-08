import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { About1, About2, About3 } from "../../Assets";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS CSS

const blogPosts = [
  {
    id: 1,
    category: "BUSINESS",
    date: "23.06.2024",
    title: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Type..",
    image: About1,
    tag: "LOREM",
  },
  {
    id: 2,
    category: "BUSINESS",
    date: "23.06.2024",
    title: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Type..",
    image: About2,
    tag: "LOREM",
  },
  {
    id: 3,
    category: "BUSINESS",
    date: "23.06.2024",
    title: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Type..",
    image: About3,
    tag: "LOREM",
  },
];

const BlogCard = ({ post, index }) => (
  <div
    className="flex flex-col bg-[#F9F9F9] relative overflow-hidden group hover:-translate-y-2 transition-all duration-300"
    data-aos="fade-up" // AOS animation effect
    data-aos-duration="1000" // Duration of the animation
    data-aos-delay={index * 200} // Sequential delay based on index
  >
    <div className="relative p-2 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-[10px] group-hover:scale-105 transition-transform duration-300"
      />
      <span className="absolute bottom-4 left-4 bg-gray-900 text-white px-4 py-1 text-sm">
        {post.tag}
      </span>
    </div>

    <div className="mt-4 p-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="text-[12px]">{post.category}</span>
        <span>•</span>
        <span>{post.date}</span>
      </div>

      <h3 className="mt-2 text-[20px] font-semibold">{post.title}</h3>

      <button className="mt-4 flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
        VIEW MORE
        <ArrowRight size={16} />
      </button>
    </div>
  </div>
);

const NewsBlogSection = () => {
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
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <span className="text-[#479ACE] text-[20px]">
          OUR LATEST NEWS & BLOG
        </span>
        <h2 className="text-[60px] text-[#0B1826]">
          Our Best Solutions
          <br />
          News & Blogs
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </div>
  );
};

export default NewsBlogSection;
