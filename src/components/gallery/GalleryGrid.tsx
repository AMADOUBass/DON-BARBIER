"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

interface Photo {
  id: string;
  url: string;
  caption: string | null;
  altText: string | null;
  tags: string[];
  isFeatured: boolean;
}

interface Props {
  photos: Photo[];
  tags: string[];
}

export function GalleryGrid({ photos, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeTag ? photos.filter((p) => p.tags.includes(activeTag)) : photos;

  const openLightbox = (filteredIdx: number) => {
    setLightboxIndex(filteredIdx);
  };

  const lightboxPhotos = filtered.map((p) => ({
    id: p.id,
    url: p.url,
    caption: p.caption,
  }));

  return (
    <div>
      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
            !activeTag
              ? "bg-brand-gold border-brand-gold text-brand-black"
              : "border-white/20 text-brand-muted hover:border-brand-gold/40"
          )}
        >
          Tout voir
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-all capitalize",
              activeTag === tag
                ? "bg-brand-gold border-brand-gold text-brand-black"
                : "border-white/20 text-brand-muted hover:border-brand-gold/40"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-24 text-brand-muted">
          <p>La galerie sera disponible prochainement.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((photo, i) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="cursor-pointer group"
                onClick={() => openLightbox(i)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 shadow-2xl transition-all duration-300 group-hover:border-brand-gold/30">
                  <Image
                    src={photo.url}
                    alt={photo.altText ?? photo.caption ?? "Don Barbier création"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                    <ZoomIn className="w-8 h-8 text-brand-gold scale-75 group-hover:scale-100 transition-transform duration-300" />
                    {photo.caption && (
                      <p className="text-brand-gold text-sm font-display font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-center px-4">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <GalleryLightbox
        photos={lightboxPhotos}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </div>
  );
}
