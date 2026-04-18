"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Heart, Shield } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "15+ ans d'expertise en grooming et coiffure afro.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Chaque client reçoit une attention personnalisée.",
  },
  {
    icon: Shield,
    title: "Qualité",
    description: "Produits premium et techniques de coupe certifiées.",
  },
];

export function AboutSection() {
  return (
    <section className="py-24 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-brand-gold/20 shadow-2xl">
            <Image
              src="/images/team/don.png"
              alt="Elvis 'Don' Berwa — Fondateur de Le Don Barbier"
              fill
              className="object-cover object-center scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent" />
          </div>
          {/* Gold accent border */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brand-gold/20 rounded-2xl -z-10" />
          {/* Experience badge */}
          <div className="absolute -top-6 -left-6 bg-brand-gold rounded-2xl p-5 shadow-gold-lg">
            <p className="font-display text-3xl font-bold text-brand-black">
              15+
            </p>
            <p className="text-xs text-brand-black/70 font-medium mt-0.5">
              ans d&apos;expérience
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}>
          <p className="text-brand-gold text-sm font-medium uppercase tracking-widest mb-3">
            À propos
          </p>
          <h2 className="section-title mb-6 text-balance">
            L&apos;Héritage d&apos;Elvis <span className="text-brand-gold italic">Don</span> Berwa
            <br />
            <span className="text-2xl text-brand-muted font-light">Fondateur de Le Don Barbier</span>
          </h2>
          <div className="divider-gold mx-0 mb-6 w-16" />
          <p className="text-brand-muted leading-relaxed mb-4">
            Visionnaire et passionné, Elvis &quot;Don&quot; Berwa a fondé Le Don Barbier avec une mission claire : 
            élever le grooming masculin au rang d&apos;art. Son crédo, <span className="text-brand-gold font-bold">#BÉNITSOITLAMAIN</span>, 
            incarne la gratitude et la maîtrise technique qui animent chaque geste.
          </p>
          <p className="text-brand-muted leading-relaxed mb-8">
            Expert reconnu dans la maîtrise des textures afro et des dégradés de haute précision, 
            Elvis a bâti un sanctuaire dédié à l&apos;élégance masculine à Québec. Ici, chaque coupe est 
            une affirmation d&apos;identité et un hommage à l&apos;excellence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="text-center p-4 bg-brand-black/40 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-colors">
                  <Icon className="w-6 h-6 text-brand-gold mx-auto mb-2" />
                  <p className="text-sm font-semibold text-brand-beige">
                    {v.title}
                  </p>
                  <p className="text-xs text-brand-muted mt-1">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

