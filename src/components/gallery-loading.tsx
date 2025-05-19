"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function GalleryLoading() {
  return (
    <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="relative mb-4 break-inside-avoid">
          <Skeleton className="h-[300px] w-full rounded-xl bg-neutral-900" />
          {/* Optional: add a dark overlay for extra darkness */}
        </div>
      ))}
    </div>
  );
}
