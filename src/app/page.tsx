"use client";

import type React from "react";
import { useRef } from "react";
import Navbar from "@/components/navbar";
import GalleryMasonry from "@/components/gallery-masonry";
import Footer from "@/components/footer";
import { HeroSection } from "@/components/sections/heroSection";
import { AboutSection } from "@/components/sections/aboutSection";
import { AboutMeSection } from "@/components/sections/aboutmeSection";
import { ServicesSection } from "@/components/sections/serviceSection";
import { ContactSection } from "@/components/sections/contactSection";

export default function Home() {
  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const sections: {
    id: string;
    ref: React.RefObject<HTMLDivElement | null>;
    label: string;
  }[] = [
    { id: "home", ref: homeRef, label: "Strona główna" },
    { id: "about", ref: aboutRef, label: "O mnie" },
    { id: "services", ref: servicesRef, label: "Usługi" },
    { id: "gallery", ref: galleryRef, label: "Galeria" },
    { id: "contact", ref: contactRef, label: "Kontakt" },
  ];

  const scrollToSection = (
    sectionRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (sectionRef.current) {
      const element = sectionRef.current;
      const y = element.getBoundingClientRect().top + window.scrollY - 80; // Offset for navbar
      setTimeout(() => {
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar sections={sections} />

      <HeroSection
        homeRef={homeRef}
        aboutRef={aboutRef}
        scrollToSection={scrollToSection}
      />

      <AboutSection aboutRef={aboutRef} />

      <AboutMeSection />

      <ServicesSection servicesRef={servicesRef} />

      <section
        ref={galleryRef}
        id="gallery"
        className="py-24 section-transition-4"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display font-Audiowide">
              Galeria
            </h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-body md:text-xl">
              Zobacz zdjęcia z moich wydarzeń
            </p>
          </div>
          <GalleryMasonry />
        </div>
      </section>

      <ContactSection contactRef={contactRef} />

      <Footer sections={sections} />
    </div>
  );
}
