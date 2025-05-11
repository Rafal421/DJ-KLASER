"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Update the gallery items to have consistent sizes
const galleryItems = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+1",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+2",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+3",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+4",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+5",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+6",
  },
  {
    id: 7,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+7",
  },
  {
    id: 8,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+8",
  },
  {
    id: 9,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+9",
  },
  {
    id: 10,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+10",
  },
  {
    id: 11,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+11",
  },
  {
    id: 12,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+12",
  },
  {
    id: 13,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+13",
  },
  {
    id: 14,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+14",
  },
  {
    id: 15,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+15",
  },
  {
    id: 16,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+16",
  },
  {
    id: 17,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+17",
  },
  {
    id: 18,
    image: "/placeholder.svg?height=600&width=600&text=DJ+Event+18",
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<
    null | (typeof galleryItems)[0]
  >(null);

  return (
    <div className="min-h-screen bg-black">
      {/* Gallery Header */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=DJ+KALSER+GALLERY"
            alt="DJ Kalser Gallery"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-4 tracking-tight font-orbitron"
          >
            <span className="gradient-text neon-blue">GALLERY</span>
          </motion.h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <Button
            variant="outline"
            asChild
            className="border-blue-500/30 text-blue-500 hover:bg-blue-500/20 neon-box font-montserrat"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Gallery Grid - Full Width */}
        {/* Update the gallery grid to use consistent sizing */}
        <div className="full-bleed px-3 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-[2000px] mx-auto">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                className="group relative overflow-hidden cursor-pointer bg-neutral-100 rounded-md aspect-square"
                onClick={() => setSelectedImage(item)}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt="DJ Kalser Event"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            >
              <Image
                src={selectedImage.image || "/placeholder.svg"}
                alt="DJ Kalser Event"
                width={1500}
                height={1000}
                className="object-contain max-h-[90vh]"
              />
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-blue-500/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-blue-500/50 hover:bg-blue-500/50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
