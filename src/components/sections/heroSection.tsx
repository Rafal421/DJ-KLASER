import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

interface HeroSectionProps {
  homeRef?: React.RefObject<HTMLDivElement | null>;
  aboutRef?: React.RefObject<HTMLDivElement | null>;
  scrollToSection?: (ref: React.RefObject<HTMLDivElement | null>) => void;
}

export function HeroSection({
  homeRef,
  aboutRef,
  scrollToSection,
}: HeroSectionProps) {
  return (
    <section
      ref={homeRef}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
        <video
          src="https://res.cloudinary.com/dscvxyjvn/video/upload/q_auto,f_auto/v1747138841/Untitled_axgkb1.mp4"
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          className="object-cover w-full h-full absolute top-0 left-0"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        <h1 className="text-6xl sm:text-6xl md:text-6xl lg:text-8xl font-bold mb-4 tracking-tighter font-display font-Audiowide flex items-center justify-center gap-[0.1em] sm:gap-[0.15em]">
          <span>DJ</span>
          <span className="gradient-text neon-blue">KLASER</span>
        </h1>
        <p className="text-lg sm:text-base md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300 font-body">
          Tworzę niezapomniane muzyczne doświadczenia na każdą okazję
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white neon-box font-body"
            onClick={() =>
              scrollToSection && aboutRef && scrollToSection(aboutRef)
            }
          >
            Odkryj stronę
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce cursor-pointer"
        onClick={() => scrollToSection && aboutRef && scrollToSection(aboutRef)}
      >
        <ChevronDown className="h-8 w-8 text-blue-500" />
      </div>
    </section>
  );
}
