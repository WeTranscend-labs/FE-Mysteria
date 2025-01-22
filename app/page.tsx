"use client";

import { Navbar } from "@/components/navbar";
import { FloatingNav } from "@/components/floating-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { StatsSection } from "@/components/sections/stats-section";
import { DemoSection } from "@/components/sections/demo-section";
import { RoadmapSection } from "@/components/sections/roadmap-section";
import { ContactSection } from "@/components/sections/contact-section";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useState } from "react";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Show regular navbar on mobile and desktop (when not scrolled) */}
      <div className={isDesktop ? (scrolled ? "hidden" : "block") : "block"}>
        <Navbar onNavigate={scrollToSection} />
      </div>

      {/* Show floating nav only on desktop when scrolled */}
      {isDesktop && scrolled && (
        <FloatingNav onNavigate={scrollToSection} />
      )}

      <motion.main
        className="min-h-screen bg-background relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,189,202,0.1)_0%,rgba(0,0,0,0)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(130,71,229,0.1)_0%,rgba(0,0,0,0)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(78,125,239,0.1)_0%,rgba(0,0,0,0)_100%)]" />
        </div>

        {/* Content sections */}
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        
        <RoadmapSection />
        <ContactSection />

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-muted-foreground">
          <div className="container mx-auto px-4">
            <p>© 2024 Mysteria. All rights reserved.</p>
            <p className="mt-2">Powered by BitsCrunch</p>
          </div>
        </footer>
      </motion.main>
    </>
  );
}