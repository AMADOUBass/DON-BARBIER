"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface Photo {
  id: string;
  url: string;
  caption: string | null;
}

interface Props {
  photos: Photo[];
  activeIndex: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function GalleryLightbox({ photos, activeIndex, onClose, onChange }: Props) {
  const isOpen = activeIndex !== null;
  const photo = activeIndex !== null ? photos[activeIndex] : null;

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onChange((activeIndex - 1 + photos.length) % photos.length);
  }, [activeIndex, photos.length, onChange]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onChange((activeIndex + 1) % photos.length);
  }, [activeIndex, photos.length, onChange]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] bg-brand-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-brand-beige transition-all z-10"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-brand-muted uppercase tracking-widest">
            {(activeIndex ?? 0) + 1} / {photos.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-brand-gold/20 hover:text-brand-gold flex items-center justify-center text-brand-beige transition-all z-10"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-4xl max-h-[80vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full min-h-[50vh]">
              <Image
                src={photo.url}
                alt={photo.caption ?? "Création Don Barbier"}
                fill
                className="object-contain rounded-xl"
                quality={100}
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </div>
            {photo.caption && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-center text-sm text-brand-muted mt-4 tracking-wide"
              >
                {photo.caption}
              </motion.p>
            )}
          </motion.div>

          {/* Next */}
          <button
            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-brand-gold/20 hover:text-brand-gold flex items-center justify-center text-brand-beige transition-all z-10"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dot nav */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); onChange(i); }}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-5 h-1.5 bg-brand-gold" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Helper icon for gallery items
export { ZoomIn };
