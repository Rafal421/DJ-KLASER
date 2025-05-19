"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Expand,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/footer";

// Helper function to determine if a file is a video
const isVideo = (url: string) => {
  return url.match(/\.(mp4|webm|ogg|mov)$/i) !== null;
};

// Gallery items with descriptions
const galleryItems = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747496797/Weronika-i-Patryk-593-1-scaled_cdbcsl.jpg",
    description: "DJ Kalser oraz DJ Szpilka",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747258913/db540f69-ff96-443f-b5bd-84675f495219_h9rzxm.mov",
    description: "Wesleny Taniec",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747496795/SS-535_ozi3ax.jpg",
    description: "Zabawy i atrakcje",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747496797/1675576481777-scaled_njt181.jpg",
    description: "Zabawy i atrakcje",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747141319/SS-444-min-1-scaled_zyi96m.jpg",
    description: "Weselna Impreza",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747255914/SS-445-min-1-scaled_jsfw46.jpg",
    description: "Dj Kalser oraz DJ Szpilka",
  },
  {
    id: 7,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747256055/SS-479-min-1-scaled_k5lgqh.jpg",
    description: "Dj razem z Panna Młodą",
  },
  {
    id: 8,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747256055/1675576481837-scaled_lqmfzy.jpg",
    description: "Zabawy i atrakcje",
  },
  {
    id: 9,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747496796/9N1A5737-1-scaled_vgc19m.jpg",
    description: "Dj razem z Panna Młodą",
  },
  {
    id: 10,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747496795/SS-532_jumf0c.jpg",
    description: "Zabawy i atrakcje",
  },
  {
    id: 11,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747258913/30ed6ac2-ef30-4e10-a1d4-c1a0419bfaaf_sdntn8.mov",
    description: "Impreza ",
  },
  {
    id: 12,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747258911/0dd8de04-9b03-4f93-9c5b-213eb9a525df_hjaeke.mov",
    description: "Impreza",
  },
  {
    id: 13,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747502320/f0632bd7-c20a-426a-be5d-062cd448cc84_mnhi47.mov",
    description: "Pierwszy taniec",
  },
  {
    id: 14,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747257404/a51a223c-0b19-451d-9f27-1dc0e0c2a66a_mtmrae.mov",
    description: "Impreza",
  },
  {
    id: 15,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747256061/18707e3f-d10d-4c04-9460-e68880d67301_s8twxh.mov",
    description: "Wesele",
  },
  {
    id: 16,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747256058/9N1A5842-1-scaled_ciqxxj.jpg",
    description: "Zdjecie z Panna Młodą",
  },
  {
    id: 17,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747138841/equipment2_pdk5g1.jpg",
    description: "Professional DJ equipment setup for live events",
  },
  {
    id: 18,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747138840/party_ing2lh.jpg",
    description: "DJ Klaser oraz Dj Szpilka",
  },
  {
    id: 19,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747138839/ME2_fnzp27.jpg",
    description: "DJ Klaser oraz Dj Szpilka",
  },
  {
    id: 20,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747138839/ME_pn08qp.jpg",
    description: "DJ Klaser oraz Dj Szpilka",
  },
  {
    id: 21,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747138839/photo12_gu60iu.jpg",
    description: "Sprzęt DJ-a Kalsera",
  },
  {
    id: 22,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747138841/equipment2_pdk5g1.jpg",
    description: "Sprzęt DJ-a Kalsera",
  },
  {
    id: 23,
    image:
      "https://res.cloudinary.com/dscvxyjvn/video/upload/v1747138841/Untitled_axgkb1.mp4",
    description: "Sprzęt DJ-a Kalsera",
  },
  {
    id: 24,
    image:
      "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747138838/equipment_rwqqao.jpg",
    description: "Sprzęt DJ-a Kalsera",
  },
].map((item) => ({
  ...item,
  image: item.image
    ? item.image.match(/\.(mp4|webm|ogg|mov)$/i)
      ? item.image.replace(/\/upload\//, "/upload/q_auto,f_auto/")
      : item.image.replace(/\/upload\//, "/upload/w_auto,q_auto,f_auto/")
    : undefined,
}));

const getLightboxImage = (url: string | undefined) => {
  if (!url) return undefined;
  if (isVideo(url)) return url;
  // Ensure w_1200,q_auto,f_auto for lightbox
  return url.replace(/\/upload\/[^/]*\//, "/upload/w_1200,q_auto,f_auto/");
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getBlurDataURL = (_url: string | undefined) => {
  // Use a dark SVG for a dark blur effect
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEyIDkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjkiIGZpbGw9IiMwMDAiLz48L3N2Zz4=";
};

export default function GalleryPage() {
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
    <div
      className="min-h-screen bg-black"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Gallery Header */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
          <Image
            src="https://res.cloudinary.com/dscvxyjvn/image/upload/v1747138838/equipment_rwqqao.jpg"
            alt="DJ Kalser Gallery"
            fill
            className="object-cover"
            priority={true}
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-4 tracking-tight font-display"
          >
            <span className="gradient-text neon-blue">GALERIA</span>
          </motion.h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <Button
            variant="outline"
            asChild
            className="border-neutral-800 text-white hover:bg-neutral-800 font-medium"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Powrót do strony głównej
            </Link>
          </Button>
        </div>

        {/* Gallery Grid - Full Width */}
        <div className="full-bleed px-3 md:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[2000px] mx-auto">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index * 0.03, 0.5),
                }}
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
                    priority={
                      [
                        "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747141319/SS-444-min-1-scaled_zyi96m.jpg",
                        "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747496796/9N1A5737-1-scaled_vgc19m.jpg",
                        "https://res.cloudinary.com/dscvxyjvn/image/upload/v1747138841/equipment2_pdk5g1.jpg",
                      ].includes(item.image || "") || index < 4
                    }
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
        </div>
      </div>

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
                        priority={true}
                        sizes="(min-width:1280px) 1152px, 100vw"
                        placeholder="blur"
                        blurDataURL={getBlurDataURL(
                          galleryItems[selectedImage].image
                        )}
                      />
                    )}

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

      {/* Footer */}
      <Footer />
    </div>
  );
}
