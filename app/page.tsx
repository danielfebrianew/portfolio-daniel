import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { DotGrid } from "@/components/animated/DotGrid";
import { FloatingCode } from "@/components/animated/FloatingCode";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-nav">
        Skip to main content
      </a>

      <DotGrid />
      <FloatingCode />

      <Navbar />

      <main id="main" style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
