import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Galerie | Don Barbier",
  description: "Découvrez l'excellence du grooming chez Le Don Barbier : dégradés de précision, soin des locs et coiffures afro haut de gamme à Québec.",
};

export default async function GalleryPage() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: 48,
  });

  const tags = [...new Set(photos.flatMap((p) => p.tags))].sort();

  return (
    <div className="min-h-screen pt-0 pb-16 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-gold text-sm font-medium uppercase tracking-widest mb-3">Galerie</p>
          <h1 className="section-title">Nos créations</h1>
          <div className="divider-gold" />
          <p className="mt-4 text-brand-muted max-w-xl mx-auto">
            Chaque style est une œuvre d&apos;art. Découvrez le travail de notre équipe.
          </p>
        </div>

        <GalleryGrid photos={photos} tags={tags} />
      </div>
    </div>
  );
}

