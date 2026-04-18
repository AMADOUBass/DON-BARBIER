"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Link from "next/link";

const FAQ_SECTIONS = [
  {
    section: "Réservations & Boutique",
    items: [
      {
        q: "Comment réserver chez Le Don Barbier ?",
        a: "La réservation se fait exclusivement en ligne. Choisissez votre service (Grooming, Locs, Tresses), votre expert, puis votre créneau. Un dépôt de 30% est requis pour sécuriser votre place et sera déduit du montant final.",
      },
      {
        q: "Où se trouve le salon à Québec ?",
        a: "Nous sommes situés au 2880 Av. Duval, Québec, QC. C'est l'emplacement phare de l'excellence du grooming dans la capitale.",
      },
      {
        q: "Puis-je annuler mon rendez-vous ?",
        a: "Oui, les annulations sont possibles via votre compte client jusqu'à 24h avant le rendez-vous. En deçà de ce délai, le dépôt de 30% est conservé à titre de frais de dédommagement.",
      },
      {
        q: "Quels sont les délais de livraison pour la boutique ?",
        a: "Nous expédions nos produits premium partout au Canada sous 3 à 5 jours ouvrables. La livraison est gratuite pour toute commande de 75$ et plus.",
      },
    ],
  },
  {
    section: "Expertise & Services",
    items: [
      {
        q: "Êtes-vous spécialisés uniquement en cheveux Afro ?",
        a: "Nous sommes les leaders de la coiffure Afro et Mixte à Québec, mais notre expertise des contours et des fades s'applique à tous les types de cheveux recherchant une précision millimétrée.",
      },
      {
        q: "Offrez-vous des services pour les Locs ?",
        a: "Absolument. Du 'Starter Locs' (installation) au 'Retwist Signature' avec soin hydratant, nous maîtrisons l'art des locs sous toutes ses formes.",
      },
      {
        q: "Proposez-vous des tresses pour hommes et femmes ?",
        a: "Oui, notre équipe inclut des experts en tresses et cornrows (tête complète ou design personnalisé) pour sublimer toutes les textures.",
      },
    ],
  },
  {
    section: "Compte & Membres",
    items: [
      {
        q: "Pourquoi devenir membre Don Barbier ?",
        a: "Le statut de membre (gratuit) vous offre des tarifs préférentiels sur la boutique, un accès prioritaire aux nouveaux créneaux de réservation et des offres exclusives réservées à l'élite de notre clientèle.",
      },
      {
        q: "Mes informations de paiement sont-elles sécurisées ?",
        a: "Oui, nous utilisons Stripe, le standard mondial de sécurité bancaire. Vos coordonnées de carte ne sont jamais stockées sur nos serveurs.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-brand-charcoal rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/3 transition-colors"
      >
        <span className="font-medium text-brand-beige text-sm sm:text-base">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-brand-gold shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-brand-muted leading-relaxed border-t border-brand-charcoal pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen pt-0 pb-20 bg-brand-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-brand-gold text-sm font-medium uppercase tracking-widest mb-3">
            Aide
          </p>
          <h1 className="section-title">Questions fréquentes</h1>
          <div className="divider-gold" />
          <p className="text-brand-muted text-sm mt-4">
            Vous ne trouvez pas la réponse ?{" "}
            <Link href="/contact" className="text-brand-gold hover:underline">
              Contactez-nous directement.
            </Link>
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {FAQ_SECTIONS.map((sec) => (
            <section key={sec.section}>
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-5 h-5 text-brand-gold shrink-0" />
                <h2 className="font-display text-xl font-semibold text-brand-beige">
                  {sec.section}
                </h2>
              </div>
              <div className="space-y-2">
                {sec.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 card text-center">
          <p className="font-display text-xl font-semibold text-brand-beige mb-2">
            Encore des questions ?
          </p>
          <p className="text-brand-muted text-sm mb-5">
            Notre équipe est là pour vous aider du lundi au samedi.
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}

