"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors, RefreshCw, Crown, Sparkles, ArrowRight } from "lucide-react";

import Image from "next/image";

const services = [
  {
    icon: Scissors,
    title: "Signature Fade & Barbe",
    description:
      "L'accord parfait entre dégradé haute précision et soin de barbe sculpté. Une expertise toutes textures, spécialisée Afro.",
    duration: "1–1,5 h",
    price: "À partir de 45 CAD",
    image: "/images/services/fade-luxury.png",
  },
  {
    icon: Crown,
    title: "Starter Locs",
    description:
      "Initialisez votre voyage capillaire avec l'excellence. Techniques de départ adaptées à la densité et à la texture unique de vos cheveux.",
    duration: "3–5 h",
    price: "À partir de 150 CAD",
    image: "/images/services/starter-locs.png",
  },
  {
    icon: RefreshCw,
    title: "Retwist & Soin Gold",
    description:
      "L'entretien complet de vos locs combiné à un soin hydratant profond pour une brillance et une santé incomparables.",
    duration: "1,5–3 h",
    price: "À partir de 85 CAD",
    image: "/images/services/retwist.png",
  },
  {
    icon: Sparkles,
    title: "Tresses & Cornrows",
    description:
      "L&apos;art des tresses protectrices exécuté avec une précision géométrique. Styles traditionnels et modernes pour l'homme moderne.",
    duration: "1–4 h",
    price: "À partir de 65 CAD",
    image: "/images/services/braids.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-gold text-sm font-medium uppercase tracking-widest mb-3">
            Nos Services
          </p>
          <h2 className="section-title">
            L&apos;expertise au service
            <br />
            de votre identité
          </h2>
          <div className="divider-gold" />
          <p className="mt-4 text-brand-muted max-w-2xl mx-auto">
            Chaque service est réalisé avec soin par notre équipe d&apos;experts,
            spécialisée dans les textures afro et le soin capillaire de précision.
          </p>
        </div>

        {/* Service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="card-hover group flex flex-col h-full p-0 overflow-hidden relative min-h-[420px] sm:min-h-0 sm:p-6">
                {/* Image Background for Mobile / Top for Desktop */}
                <div className="absolute inset-0 sm:relative sm:h-48 sm:-mx-6 sm:-mt-6 sm:mb-6 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  {/* Overlay for mobile (full) and desktop (bottom of image) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-brand-black/20 sm:from-brand-black/80 sm:via-transparent group-hover:opacity-40 transition-opacity" />

                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-brand-black/60 backdrop-blur-md border border-brand-gold/20 rounded-xl flex items-center justify-center z-20">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold" />
                  </div>
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-end p-6 pt-16 sm:p-0 sm:pt-0">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl sm:text-xl font-semibold text-brand-beige group-hover:text-brand-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-brand-beige/90 sm:text-brand-muted leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 sm:border-white/5 mt-auto">
                    <p className="text-xs text-brand-beige/70 sm:text-brand-muted">
                      Durée : {service.duration}
                    </p>
                    <p className="text-xl sm:text-sm font-semibold text-brand-gold mt-1">
                      {service.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-12">
          <Link href="/booking" className="btn-primary gap-2 inline-flex">
            Réserver un service <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

