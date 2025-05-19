import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Gallery Header Loading */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Skeleton className="absolute inset-0 bg-neutral-900" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Skeleton className="h-24 w-72 mx-auto bg-neutral-900" />
        </div>
      </div>

      {/* Gallery Grid Loading */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <Skeleton className="h-10 w-48 bg-neutral-900" />
        </div>

        <div className="full-bleed px-3 md:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[2000px] mx-auto">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="aspect-[4/3]">
                <Skeleton className="h-full w-full rounded-xl bg-neutral-900" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
