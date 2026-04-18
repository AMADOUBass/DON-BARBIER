"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Crown, Star, Gem, ArrowRight, UserPlus } from "lucide-react";

const tiers = [
  {
    name: "Signature",
    price: "120",
    icon: Star,
    features: ["4 coupes par mois", "Contours illimités", "Boutique à -10%"],
    color: "text-brand-gold",
    bg: "bg-brand-charcoal/30",
  },
  {
    name: "Élite",
    price: "150",
    icon: Crown,
    features: ["Tout de Signature", "Accès après 18h", "RDV Prioritaire"],
    featured: true,
    color: "text-brand-gold",
    bg: "bg-brand-gold/5 border-brand-gold/30",
  },
  {
    name: "Prestige",
    price: "200",
    icon: Gem,
    features: ["Tout d'Élite", "Service à domicile", "Kit Premium Mensuel"],
    color: "text-brand-gold",
    bg: "bg-brand-charcoal/30",
  },
];

export function MembershipSection() {
  return (
    <section className="py-24 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-gradient opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-gold text-sm font-medium uppercase tracking-widest mb-3">Expérience Club Privé</p>
          <h2 className="section-title">Rejoignez l&apos;Élite Don Barbier</h2>
          <div className="divider-gold" />
          <p className="text-brand-muted mt-4 max-w-2xl mx-auto">
            Accédez à un service sur-mesure conçu pour ceux qui ne font aucun compromis 
            sur leur image. Choisissez le forfait qui vous correspond.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-3xl border ${tier.bg} flex flex-col h-full group hover:border-brand-gold/40 transition-all duration-500`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-gold text-brand-black text-[10px] font-bold uppercase tracking-widest">
                    Plus Populaire
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                    <Icon className={`w-5 h-5 ${tier.color}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-brand-beige">{tier.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-brand-gold">{tier.price}$</span>
                      <span className="text-[10px] text-brand-muted uppercase tracking-wider">/ mois</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-brand-muted">
                      <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/club"
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-center transition-all ${
                    tier.featured
                      ? "bg-brand-gold text-brand-black hover:bg-white"
                      : "border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10"
                  }`}
                >
                  S&apos;abonner
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link 
            href="/club" 
            className="group inline-flex items-center gap-2 text-brand-beige hover:text-brand-gold transition-colors text-sm font-medium"
          >
            Comparer tous les forfaits <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-xs text-brand-muted">Pas encore prêt pour un forfait ?</span>
            <Link 
              href="/signup" 
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-brand-beige transition-colors"
            >
              <UserPlus className="w-4 h-4" /> Créer un compte gratuit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
