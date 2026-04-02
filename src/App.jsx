import { useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

// Layout
import CustomCursor from "./components/layout/CustomCursor";
import ScrollProgress from "./components/layout/ScrollProgress";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Sections
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

// Styles
import "./styles/portfolio.css";

export default function App() {
  const [activeSection] = useState("ACCUEIL");
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <CustomCursor />
      <ScrollProgress scrollYProgress={progressWidth} />
      <Navbar activeSection={activeSection} />

      <div ref={containerRef} className="scroll-container">
        <Hero />
        <Marquee />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
