import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Delivery from "./components/Delivery";
import Stories from "./components/Stories";
import Higlight from "./components/Higlight";
import Patners from "./components/Patners";
import Footer from "./components/Footer";

function Hometemp() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Delivery />
      <Stories />
      <Higlight />
      <Patners />
      <Footer />
    </div>
  );
}

export default Hometemp;
