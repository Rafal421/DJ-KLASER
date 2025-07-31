"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface PageLoadingOverlayProps {
  show?: boolean;
}

function SectionSkeleton({
  headingWidth = "w-48",
  rows = 2,
  cols = 3,
}: {
  headingWidth?: string;
  rows?: number;
  cols?: number;
}) {
  return (
    <section className="py-16">
      <div className="text-center mb-8">
        <Skeleton
          className={`h-12 ${headingWidth} mx-auto mb-4 bg-neutral-900`}
        />
        <Skeleton className="h-1 w-20 mx-auto bg-neutral-900" />
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-4`}>
        {Array.from({ length: rows * cols }).map((_, i) => (
          <Skeleton
            key={i}
            className="aspect-[4/3] rounded-xl bg-neutral-900"
          />
        ))}
      </div>
    </section>
  );
}

export default function PageLoadingOverlay({
  show = true,
}: PageLoadingOverlayProps) {
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col overflow-y-auto bg-black text-white"
      role="status"
      aria-live="polite"
    >
      {/* Hero */}
      <div className="h-screen relative flex items-center justify-center">
        <Skeleton className="absolute inset-0 bg-neutral-900" />
        <div className="relative z-10 text-center px-4">
          <Skeleton className="h-24 w-full max-w-xl mx-auto mb-4 bg-neutral-900" />
          <Skeleton className="h-8 w-1/2 mx-auto mb-8 bg-neutral-900" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-32 bg-neutral-900" />
            <Skeleton className="h-12 w-32 bg-neutral-900" />
          </div>
        </div>
      </div>
      {/* Reuseable sections */}
      <SectionSkeleton headingWidth="w-48" rows={3} cols={2} /> {/* About */}
      <SectionSkeleton headingWidth="w-48" rows={2} cols={2} /> {/* Services */}
      <SectionSkeleton headingWidth="w-48" rows={4} cols={4} /> {/* Gallery */}
      <SectionSkeleton headingWidth="w-48" rows={3} cols={2} /> {/* Contact */}
    </div>
  );
}
