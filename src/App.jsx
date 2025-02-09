import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './pages/About';
import Product from "./pages/Product"

const App = () => {
 

  return (
    <>


        <div className=" font-DMSans  ">
        <Navbar />
        <Hero />
        <About />
        <Product/>
    
      </div>
     </>
  );
};

export default App;
