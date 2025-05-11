"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Static gallery items
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
];

export default function GalleryMasonry() {
  const [selectedImage, setSelectedImage] = useState<
    null | (typeof galleryItems)[0]
  >(null);

  return (
    <div className="full-bleed px-3 md:px-6">
      {/* Gallery Grid - All boxes same size */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-[2000px] mx-auto">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.03 }}
            className="group relative overflow-hidden cursor-pointer bg-neutral-100 rounded-md aspect-square"
            onClick={() => setSelectedImage(item)}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={`DJ Kalser Event ${item.id}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
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
              className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
            >
              <Image
                src={selectedImage.image || "/placeholder.svg"}
                alt={`DJ Kalser Event ${selectedImage.id}`}
                width={1200}
                height={800}
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
