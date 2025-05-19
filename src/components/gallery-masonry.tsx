"use client";

import type React from "react";

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

const galleryItems = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747258913/db540f69-ff96-443f-b5bd-84675f495219_h9rzxm.mov",
    description: "Pierwszy Taniec",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747502320/f0632bd7-c20a-426a-be5d-062cd448cc84_mnhi47.mov",
    description: "Pierwszy Taniec",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747257404/a51a223c-0b19-451d-9f27-1dc0e0c2a66a_mtmrae.mov",
    description: "Imperaza",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747258913/30ed6ac2-ef30-4e10-a1d4-c1a0419bfaaf_sdntn8.mov",
    description: "Impreza",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747257408/53296a38-148c-4131-91b6-d9751f4a4592_1_qemjin.mov",
    description: "Impreza",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747257404/a51a223c-0b19-451d-9f27-1dc0e0c2a66a_mtmrae.mov",
    description: "Impreza",
  },
  {
    id: 7,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747258911/0dd8de04-9b03-4f93-9c5b-213eb9a525df_hjaeke.mov",
    description: "Imoreza",
  },
  {
    id: 8,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747256061/18707e3f-d10d-4c04-9460-e68880d67301_s8twxh.mov",
    description: "Wesele",
  },
  {
    id: 9,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747257405/3058bc37-3236-4ad4-8620-6b171c498c30_rdm9h0.mov",
    description: "Imopreza",
  },
  {
    id: 10,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747256057/1675576481777-scaled_wteti9.jpg",
    description: "Zabawa na weselu",
  },
  {
    id: 11,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747255913/Weronika-i-Patryk-593-1-scaled_peel85.jpg",
    description: "DJ Klaser i DJ Szpilka",
  },
  {
    id: 12,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747255957/SS-535_umvfxk.jpg",
    description: "Zabawa na weselu",
  },
].map((item) => ({
  ...item,
  image: item.image
    ? item.image.match(/\.(mp4|webm|ogg|mov)$/i)
      ? item.image.replace(/\/upload\//, "/upload/q_auto,f_auto/")
      : item.image.replace(/\/upload\//, "/upload/w_auto,q_auto,f_auto/")
    : undefined,
}));

const isVideo = (url: string) => {
  return url.match(/\.(mp4|webm|ogg|mov)$/i) !== null;
};

const getLightboxImage = (url: string | undefined) => {
  if (!url) return undefined;
  if (isVideo(url)) return url;
  // Ensure w_1200,q_auto,f_auto for lightbox
  return url.replace(/\/upload\/[^/]*\//, "/upload/w_1200,q_auto,f_auto/");
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getBlurDataURL = (_url: string | undefined) => {
  // Optionally, generate a tiny Cloudinary image or use a generic SVG
  // For demo, use a tiny transparent SVG
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEyIDkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjkiIGZpbGw9IiNlZWUiLz48L3N2Zz4=";
};

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
            className="group relative overflow-hidden cursor-pointer bg-black rounded-xl shadow-sm aspect-[4/3] hover:shadow-md transition-all duration-300"
            onClick={() => {
              setSelectedImage(index);
              setDirection(0);
            }}
            aria-label={`View ${
              isVideo(item.image || "") ? "video" : "image"
            } ${index + 1}: ${item.description}`}
          >
            {isVideo(item.image || "") ? (
              <video
                src={item.image}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                muted
                loop
                playsInline
                autoPlay
              />
            ) : (
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 4}
              />
            )}
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
            aria-label="Media lightbox"
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
              {/* Navigation - Mobile friendly with larger touch targets */}
              <button
                className="fixed left-0 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-16 h-16 sm:w-12 sm:h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                onClick={goToPrev}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8 sm:h-6 sm:w-6" />
              </button>

              {/* Image/Video content */}
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
                    {isVideo(galleryItems[selectedImage].image || "") ? (
                      <video
                        src={galleryItems[selectedImage].image}
                        className="max-h-full max-w-full"
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <Image
                        src={
                          getLightboxImage(galleryItems[selectedImage].image) ||
                          "/placeholder.svg"
                        }
                        alt={galleryItems[selectedImage].description}
                        fill
                        className="object-contain"
                        priority
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL={getBlurDataURL(
                          galleryItems[selectedImage].image
                        )}
                      />
                    )}

                    {/* Preload next/prev images for instant navigation */}
                    {[selectedImage - 1, selectedImage + 1].map((idx) => {
                      const i =
                        (idx + galleryItems.length) % galleryItems.length;
                      const item = galleryItems[i];
                      if (!item || isVideo(item.image || "")) return null;
                      return (
                        <Image
                          key={i}
                          src={
                            getLightboxImage(item.image) || "/placeholder.svg"
                          }
                          alt={item.description}
                          fill
                          style={{ display: "none" }}
                          sizes="100vw"
                          placeholder="blur"
                          blurDataURL={getBlurDataURL(item.image)}
                          priority={false}
                        />
                      );
                    })}

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
                className="fixed right-0 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-16 h-16 sm:w-12 sm:h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Counter */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
              <div className="px-4 py-2 rounded-full text-white/90 text-sm font-medium bg-black/50 backdrop-blur-sm">
                {selectedImage + 1} / {galleryItems.length}
              </div>
            </div>

            {/* Mobile swipe areas - invisible but tappable */}
            <div
              className="fixed left-0 top-0 bottom-0 w-1/4 z-40 sm:hidden"
              onClick={goToPrev}
              aria-hidden="true"
            />
            <div
              className="fixed right-0 top-0 bottom-0 w-1/4 z-40 sm:hidden"
              onClick={goToNext}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
