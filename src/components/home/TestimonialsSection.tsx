"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Aubert M.",
    text: "Elvis est un maître du dégradé ! Mon Signature Fade n'a jamais été aussi net. Le salon dégage une ambiance haut de gamme unique.",
    rating: 5,
    service: "Signature Fade",
    initials: "AM",
  },
  {
    name: "Claude R.",
    text: "Je confie ma barbe à l'équipe de Don Barbier depuis des mois. La précision des contours est incroyable. Le meilleur à Québec !",
    rating: 5,
    service: "Barbe & Soin",
    initials: "CR",
  },
  {
    name: "Marc D.",
    text: "Service impeccable, atmosphère luxueuse et résultat parfait. L'équipe est à l'écoute de nos moindres exigences. Je recommande fortement.",
    rating: 5,
    service: "Coupe Premium",
    initials: "MD",
  },
  {
    name: "Thierry B.",
    text: "Mes locs n'ont jamais été aussi propres et bien définis. Grace est une artiste. Je fais 45 minutes de route pour venir ici — ça vaut chaque kilomètre !",
    rating: 5,
    service: "Retwist & Soin Profond",
    initials: "TB",
  },
  {
    name: "Kevin L.",
    text: "L'ambiance du salon est unique — musique, décor, accueil. Et le résultat est à la hauteur. Beri m'a fait un Burst Fade impeccable !",
    rating: 5,
    service: "Burst Fade",
    initials: "KL",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, paused]);

  const t = testimonials[current]!;

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section className="py-24 bg-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-gold text-sm font-medium uppercase tracking-widest mb-3">Témoignages</p>
          <h2 className="section-title">Ce que disent nos clients</h2>
          <div className="divider-gold" />
        </div>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Carousel */}
          <div className="relative min-h-[280px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="card relative w-full"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-gold/10" />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-brand-muted text-base sm:text-lg leading-relaxed mb-8 italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-bold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-beige">{t.name}</p>
                    <p className="text-xs text-brand-gold">{t.service}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-muted hover:text-brand-gold hover:border-brand-gold/40 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? "w-6 h-2 bg-brand-gold" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-muted hover:text-brand-gold hover:border-brand-gold/40 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
