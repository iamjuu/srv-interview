import React from "react";
import About from "../About";
import Product from "../Product/index";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
const index = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Product />
      <About />
    </div>
  );
};

export default index;
