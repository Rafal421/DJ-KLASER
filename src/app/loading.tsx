import {
  HeroSectionLoading,
  AboutSectionLoading,
  ServicesSectionLoading,
  ContactSectionLoading,
} from "@/components/page-loading";
import { GalleryLoading } from "@/components/gallery-loading";

export default function Loading() {
  return (
    <div className="bg-black text-white min-h-screen w-full overflow-x-hidden relative">
      <HeroSectionLoading />
      <AboutSectionLoading />
      <ServicesSectionLoading />
      <GalleryLoading />
      <ContactSectionLoading />
    </div>
  );
}
