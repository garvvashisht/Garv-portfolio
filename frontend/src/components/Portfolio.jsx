import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import StatsStrip from "./StatsStrip";
import About from "./About";
import Experience from "./Experience";
import Skills from "./Skills";
import Education from "./Education";
import Certifications from "./Certifications";
import Contact from "./Contact";
import Footer from "./Footer";

const Portfolio = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
