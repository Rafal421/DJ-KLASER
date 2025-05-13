"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Expand,
  Info,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// Updated with actual different image URLs
const galleryItems = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747138841/equipment2_pdk5g1.jpg",
    description: "Professional DJ equipment setup for live events",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747140883/518-1-scaled_ftvf35.jpg",
    description: "Club atmosphere with dynamic lighting",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747140884/519-1-scaled_xyz123.jpg",
    description: "Crowd enjoying the music at a festival",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747140885/520-1-scaled_abc456.jpg",
    description: "Close-up of turntable in action",
  },
  // Add more unique images as needed
];

export default function GalleryMasonry() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [direction, setDirection] = useState(0);

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setSelectedImage((prev) =>
      prev !== null ? (prev + 1) % galleryItems.length : null
    );
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setSelectedImage((prev) =>
      prev !== null
        ? (prev - 1 + galleryItems.length) % galleryItems.length
        : null
    );
  };

  const toggleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInfo((prev) => !prev);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setShowInfo(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;

    switch (e.key) {
      case "ArrowRight":
        goToNext(e as unknown as React.MouseEvent);
        break;
      case "ArrowLeft":
        goToPrev(e as unknown as React.MouseEvent);
        break;
      case "Escape":
        closeLightbox();
        break;
      case "i":
        toggleInfo(e as unknown as React.MouseEvent);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto px-4">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.03 }}
            className="group relative overflow-hidden cursor-pointer bg-white rounded-lg border border-neutral-200 shadow-sm aspect-[4/3] hover:shadow-md transition-all duration-300"
            onClick={() => {
              setSelectedImage(index);
              setDirection(0);
            }}
            aria-label={`View image ${index + 1}: ${item.description}`}
          >
            <Image
              src={item.image}
              alt={item.description}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 4} // Only prioritize first few images
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
              <div className="p-1 rounded-md bg-black/40 backdrop-blur-sm">
                <Expand className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See More Photos Button */}
      {galleryItems.length > 12 && (
        <div className="mt-8 text-center">
          <Button
            size="lg"
            className="bg-black hover:bg-neutral-800 text-white font-medium"
            asChild
          >
            <Link href="/gallery">
              See More Photos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Controls */}
            <div className="fixed top-4 right-4 z-60 flex gap-2">
              <button
                className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
                onClick={toggleInfo}
                aria-label={showInfo ? "Hide info" : "Show info"}
              >
                <Info className="h-5 w-5" />
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="w-full max-w-6xl max-h-[90vh] relative">
              {/* Navigation */}
              <button
                className="hidden sm:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
                onClick={goToPrev}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Image content */}
              <div className="relative w-full h-[85vh]">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={selectedImage}
                    custom={direction}
                    initial={{
                      x: direction > 0 ? 100 : -100,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      },
                    }}
                    exit={{
                      x: direction > 0 ? -100 : 100,
                      opacity: 0,
                      transition: { duration: 0.2 },
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Image
                      src={galleryItems[selectedImage].image}
                      alt={galleryItems[selectedImage].description}
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 1024px) 100vw, 80vw"
                    />

                    {/* Mobile navigation */}
                    <div className="sm:hidden fixed inset-x-0 bottom-8 flex justify-center gap-8 z-50">
                      <button
                        className="w-12 h-12 flex items-center justify-center text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                        onClick={goToPrev}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        className="w-12 h-12 flex items-center justify-center text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                        onClick={goToNext}
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Info panel */}
                    <AnimatePresence>
                      {showInfo && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent p-4 text-white"
                        >
                          <p className="text-sm md:text-base font-medium text-center">
                            {galleryItems[selectedImage].description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                className="hidden sm:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Counter */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
              <div className="px-4 py-2 rounded-full text-white/90 text-sm font-medium bg-black/50 backdrop-blur-sm">
                {selectedImage + 1} / {galleryItems.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
