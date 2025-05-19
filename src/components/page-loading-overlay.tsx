"use client";
import React from "react";
import { Loader2 } from "lucide-react";

export default function PageLoadingOverlay({ show = false }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md transition-all">
      <Loader2 className="animate-spin text-white w-12 h-12 opacity-80" />
    </div>
  );
}
