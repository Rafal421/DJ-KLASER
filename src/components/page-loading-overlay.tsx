"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col min-h-screen w-full text-white">
      {/* Hero Section Skeleton */}
      <div className="h-screen relative flex items-center justify-center bg-black">
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full bg-neutral-900" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Skeleton className="h-24 w-3/4 mx-auto mb-4 bg-neutral-900" />
          <Skeleton className="h-8 w-1/2 mx-auto mb-8 bg-neutral-900" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-32 bg-neutral-900" />
            <Skeleton className="h-12 w-32 bg-neutral-900" />
          </div>
        </div>
      </div>

      {/* About Section Skeleton */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-48 mx-auto mb-4 bg-neutral-900" />
            <Skeleton className="h-1 w-20 mx-auto bg-neutral-900" />
          </div>
          <Skeleton className="w-full h-[400px] mb-12 rounded-xl bg-neutral-900" />
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-48 mb-6 bg-neutral-900" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full bg-neutral-900" />
              <Skeleton className="h-4 w-5/6 bg-neutral-900" />
              <Skeleton className="h-4 w-4/5 bg-neutral-900" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-48 mx-auto mb-4 bg-neutral-900" />
            <Skeleton className="h-1 w-20 mx-auto bg-neutral-900" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-8">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j}>
                    <Skeleton className="h-64 w-full rounded-xl mb-6 bg-neutral-900" />
                    <Skeleton className="h-8 w-48 mb-4 bg-neutral-900" />
                    <Skeleton className="h-4 w-full mb-2 bg-neutral-900" />
                    <Skeleton className="h-4 w-5/6 mb-2 bg-neutral-900" />
                    <Skeleton className="h-4 w-4/5 bg-neutral-900" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section Skeleton */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-48 mx-auto mb-4 bg-neutral-900" />
            <Skeleton className="h-1 w-20 mx-auto bg-neutral-900" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[2000px] mx-auto">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[4/3]">
                <Skeleton className="h-full w-full rounded-xl bg-neutral-900" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-48 mx-auto mb-4 bg-neutral-900" />
            <Skeleton className="h-1 w-20 mx-auto bg-neutral-900" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Skeleton className="h-8 w-48 mb-6 bg-neutral-900" />
              <Skeleton className="h-4 w-full mb-8 bg-neutral-900" />
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start">
                    <Skeleton className="w-12 h-12 rounded-full mr-4 bg-neutral-900" />
                    <div>
                      <Skeleton className="h-6 w-24 mb-2 bg-neutral-900" />
                      <Skeleton className="h-4 w-48 bg-neutral-900" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-12 w-full mb-4 bg-neutral-900" />
              <Skeleton className="h-12 w-full mb-4 bg-neutral-900" />
              <Skeleton className="h-24 w-full mb-4 bg-neutral-900" />
              <Skeleton className="h-12 w-full bg-neutral-900" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
