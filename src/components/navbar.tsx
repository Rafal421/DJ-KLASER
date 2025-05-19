"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  sections: {
    id: string;
    ref: React.RefObject<HTMLDivElement | null>;
    label: string;
  }[];
}

export default function Navbar({ sections }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Throttle utility
  function throttle<T extends (...args: unknown[]) => void>(
    fn: T,
    wait: number
  ): T {
    let last = 0;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: unknown[];
    return function (this: unknown, ...args: unknown[]) {
      const now = Date.now();
      lastArgs = args;
      if (now - last >= wait) {
        last = now;
        fn.apply(this, args);
      } else if (!timeout) {
        timeout = setTimeout(() => {
          last = Date.now();
          timeout = null;
          fn.apply(this, lastArgs);
        }, wait - (now - last));
      }
    } as T;
  }

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 50);
      const currentPosition = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (
          section.ref.current &&
          section.ref.current.offsetTop <= currentPosition
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    }, 100); // 100ms throttling

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Zapewnij smooth scroll na wszystkich urządzeniach
  const safeScrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || mobileMenuOpen
          ? "bg-black shadow-lg shadow-dj-blue/10"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 h-[72px] flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold text-white font-display">
          DJ
          <span className="gradient-text neon-blue font-Audiowide">KLASER</span>
        </a>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => safeScrollToSection(section.ref)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors relative",
                activeSection === section.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {section.id === "home" && "Strona główna"}
              {section.id === "about" && "O mnie"}
              {section.id === "services" && "Usługi"}
              {section.id === "gallery" && "Galeria"}
              {section.id === "contact" && "Kontakt"}
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-dj-blue mx-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>{" "}
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className={cn(
              "relative w-10 h-10 flex items-center justify-center text-white transition-all duration-300",
              mobileMenuOpen
                ? "bg-dj-blue/20 border border-dj-blue shadow-md shadow-dj-blue/20 neon-box"
                : "hover:bg-dj-blue/20 hover:border hover:border-dj-blue/50"
            )}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="absolute"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.div>
          </Button>
        </div>
      </nav>
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-[72px] bg-black/95 backdrop-blur-md z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-dj-blue/10 to-transparent"
            />
            <div className="container mx-auto px-4 py-8 space-y-4 relative">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => {
                    safeScrollToSection(section.ref);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "block w-full text-left px-6 py-4 rounded-lg text-lg font-medium transition-all duration-300",
                    activeSection === section.id
                      ? "text-white bg-dj-blue/20 border border-dj-blue shadow-lg shadow-dj-blue/20 neon-box"
                      : "text-gray-400 hover:text-white hover:bg-dj-blue/10 hover:border hover:border-dj-blue/50"
                  )}
                >
                  {section.id === "home" && "Strona główna"}
                  {section.id === "about" && "O mnie"}
                  {section.id === "services" && "Usługi"}
                  {section.id === "gallery" && "Galeria"}
                  {section.id === "contact" && "Kontakt"}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
