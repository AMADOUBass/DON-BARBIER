"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ChevronRight, 
  Crown, 
  Gem, 
  Zap, 
  Star, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  Clock,
  UserPlus
} from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PLAN_TIERS = [
  {
    id: "SIGNATURE",
    name: "Signature",
    price: "120",
    description: "L'essentiel pour un style impeccable au quotidien.",
    icon: Star,
    color: "text-brand-gold",
    ctaText: "Choisir Signature",
    features: [
      "4 coupes mensuelles incluses",
      "Contours illimités",
      "Produits d'entretien exclusifs (-10%)",
      "Accès à la communauté Don Barbier",
    ],
  },
  {
    id: "ELITE",
    name: "Élite",
    price: "150",
    description: "Le privilège ultime pour ceux qui exigent la perfection.",
    icon: Crown,
    color: "text-brand-gold",
    featured: true,
    ctaText: "Rejoindre l'Élite",
    features: [
      "4 coupes mensuelles incluses",
      "Contours illimités",
      "Accès calendrier étendu (Après 18h)",
      "Zéro attente - Rendez-vous prioritaire",
      "Toute la boutique à -15%",
    ],
  },
  {
    id: "PRESTIGE",
    name: "Prestige",
    price: "200",
    description: "L'excellence voyage jusqu'à votre porte.",
    icon: Gem,
    color: "text-brand-gold",
    ctaText: "Accès Prestige",
    features: [
      "4 coupes à domicile incluses",
      "Contours illimités au salon ou mobile",
      "Consultation style personnalisée",
      "Kit de soins premium offert / mois",
      "Invitations événements privés",
    ],
  },
];

export default function ClubPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (tier: string) => {
    if (!session) {
      toast.error("Veuillez vous connecter pour rejoindre le Club");
      router.push("/login?callbackUrl=/club");
      return;
    }

    setLoading(tier);
    try {
      const response = await fetch("/api/membership/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Une erreur est survenue");
      }
    } catch (error) {
      toast.error("Erreur de connexion au service de paiement");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-brand-black overflow-hidden relative">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Exclusivité & Prestige
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-brand-beige mb-6 tracking-tight">
              Rejoignez le <span className="text-brand-gold italic">Club Privé</span>
            </h1>
            <p className="text-brand-muted max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Plus qu&apos;un abonnement, une promesse d&apos;excellence. Un service sur-mesure pour ceux qui placent leur image au cœur de leur réussite.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
          {PLAN_TIERS.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative h-full flex flex-col p-8 rounded-3xl border transition-all duration-500 group ${
                  plan.featured 
                    ? "bg-brand-charcoal/40 border-brand-gold/40 shadow-[0_20px_50px_rgba(212,175,55,0.15)] scale-105 z-20" 
                    : "bg-brand-charcoal/20 border-white/5 hover:border-brand-gold/20"
                }`}
              >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-brand-gold text-brand-black text-[10px] font-bold uppercase tracking-widest shadow-xl">
                      Populaire
                    </div>
                  )}

                  <div className="mb-8">
                    <div className={`w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6 border border-brand-gold/20 transition-transform duration-500 group-hover:scale-110`}>
                      <Icon className={`w-6 h-6 ${plan.color}`} />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-brand-beige mb-2">{plan.name}</h2>
                    <p className="text-xs text-brand-muted leading-relaxed h-10">{plan.description}</p>
                  </div>

                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-brand-gold">{plan.price}$</span>
                    <span className="text-sm text-brand-muted">/ mois</span>
                  </div>

                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-brand-gold" />
                        </div>
                        <span className="text-xs text-brand-muted leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading !== null}
                    className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group ${
                      plan.featured
                        ? "bg-brand-gold text-brand-black hover:bg-brand-beige shadow-lg shadow-brand-gold/10"
                        : "bg-brand-black/50 text-brand-gold border border-brand-gold/20 hover:bg-brand-gold hover:text-brand-black"
                    }`}
                  >
                    {loading === plan.id ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                    ) : (
                      <>
                        {plan.ctaText}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
              </motion.div>
            );
          })}
        </div>

        {/* Free Membership Alternative */}
        <ScrollReveal>
          <div className="mt-20 max-w-3xl mx-auto p-8 rounded-3xl border border-brand-charcoal/50 bg-brand-charcoal/10 text-center">
            <UserPlus className="w-10 h-10 text-brand-gold mx-auto mb-4 opacity-50" />
            <h2 className="font-display text-2xl font-bold text-brand-beige mb-3">Option Compte Gratuit</h2>
            <p className="text-sm text-brand-muted mb-8 leading-relaxed">
              Vous n&apos;êtes pas encore prêt pour un abonnement ? Créez un compte gratuitement pour profiter des services à la carte et de nos avantages de base.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 text-left max-w-xl mx-auto">
              {[
                "Réservation en ligne",
                "Rappels SMS/Email",
                "Offres anniversaire",
                "Historique de coupes",
                "Newsletters exclusives",
                "Accès à la boutique"
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-[10px] text-brand-muted uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/40" />
                  {f}
                </div>
              ))}
            </div>
            <Link href="/signup" className="btn-outline inline-flex px-8 py-3 text-xs">
              S&apos;inscrire gratuitement
            </Link>
          </div>
        </ScrollReveal>

        {/* FAQ Preview or Benefits */}
        <section className="mt-32 pt-20 border-t border-brand-charcoal/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ScrollReveal>
              <div className="flex gap-4">
                <ShieldCheck className="w-10 h-10 text-brand-gold flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-beige mb-2">Paiement Sécurisé</h3>
                  <p className="text-xs text-brand-muted leading-relaxed">Infrastructure Stripe certifiée PCI de niveau 1. Vos données sont cryptées.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="flex gap-4">
                <Clock className="w-10 h-10 text-brand-gold flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-beige mb-2">Sans Engagement</h3>
                  <p className="text-xs text-brand-muted leading-relaxed">Annulez votre abonnement à tout moment depuis votre dashboard client.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="flex gap-4">
                <MapPin className="w-10 h-10 text-brand-gold flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-beige mb-2">Service Mobile</h3>
                  <p className="text-xs text-brand-muted leading-relaxed">Le forfait Prestige dessert toute la région de Québec à domicile ou au bureau.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 rounded-3xl bg-brand-gold/5 border border-brand-gold/10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 via-transparent to-brand-gold/5" />
          <Crown className="w-12 h-12 text-brand-gold/20 absolute -right-4 -top-4 -rotate-12" />
          <h2 className="font-display text-2xl font-bold text-brand-beige mb-4">Une question sur nos forfaits ?</h2>
          <p className="text-sm text-brand-muted mb-8 max-w-xl mx-auto">
            Notre équipe d&apos;accueil est à votre disposition pour vous orienter vers la meilleure formule.
          </p>
          <Link href="/contact" className="btn-outline inline-flex px-8 py-3 relative z-10">
            Contacter le Don
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
