"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Calendar, Home, Mail, PartyPopper } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Props {
  isInterac: boolean;
  depositAmount?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -30 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.1 },
  },
};

const ringVariants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: {
    scale: [0.6, 1.15, 1],
    opacity: [0, 0.6, 0],
    transition: { duration: 1.2, ease: "easeOut", delay: 0.15 },
  },
};

export function BookingSuccessView({ isInterac, depositAmount }: Props) {
  return (
    <motion.div
      className="max-w-md mx-auto px-4 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Icon + pulse ring */}
      <motion.div className="relative mx-auto mb-8 w-24 h-24 flex items-center justify-center">
        {/* Pulsing ring */}
        <motion.div
          variants={ringVariants}
          className="absolute inset-0 rounded-full border-2 border-green-400"
        />
        {/* Icon circle */}
        <motion.div
          variants={iconVariants}
          className="w-24 h-24 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-green-400" />
        </motion.div>
      </motion.div>

      {/* Confetti particle */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 1, 0], y: [-10, -30, -50] }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <PartyPopper className="w-6 h-6 text-brand-gold" />
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={itemVariants}
        className="font-display text-3xl font-bold text-brand-beige mb-3"
      >
        {isInterac ? "Réservation demandée !" : "Dépôt reçu !"}
      </motion.h1>

      {/* Subtitle */}
      <motion.p variants={itemVariants} className="text-brand-muted mb-8">
        {isInterac ? (
          <>
            Votre rendez-vous a été pré-réservé. Veuillez envoyer votre dépôt par{" "}
            <span className="text-brand-gold font-semibold">Virement Interac</span> pour confirmer
            votre place.
          </>
        ) : (
          "Votre dépôt a été encaissé avec succès. Notre équipe va confirmer votre rendez-vous et vous enverra un email de confirmation sous peu."
        )}
      </motion.p>

      {/* Interac instructions */}
      {isInterac && depositAmount !== undefined && (
        <motion.div
          variants={itemVariants}
          className="card bg-brand-gold/5 border-brand-gold/30 mb-8 text-left"
        >
          <h3 className="flex items-center gap-2 text-brand-gold font-bold mb-4 uppercase tracking-widest text-xs">
            <Mail className="w-4 h-4" /> Instructions Interac
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-brand-black/40 p-3 rounded-lg border border-white/5">
              <span className="text-xs text-brand-muted uppercase">Montant du dépôt</span>
              <span className="text-brand-gold font-bold">{formatPrice(depositAmount)}</span>
            </div>
            <div className="flex justify-between items-center bg-brand-black/40 p-3 rounded-lg border border-white/5">
              <span className="text-xs text-brand-muted uppercase">Virement par SMS</span>
              <span className="text-brand-gold font-bold">(581) 745-7409</span>
            </div>
            <div className="flex justify-between items-center bg-brand-black/40 p-3 rounded-lg border border-white/5">
              <span className="text-xs text-brand-muted uppercase">Virement par Courriel</span>
              <span className="text-brand-gold font-bold">donbarbier@gmail.com</span>
            </div>
            <div className="p-3 bg-brand-gold/5 border border-brand-gold/10 rounded-lg text-xs text-brand-muted leading-relaxed">
              Le dépôt automatique est activé sur les deux options. Votre rendez-vous sera validé dès réception du virement.
            </div>
          </div>
        </motion.div>
      )}

      {/* Info card */}
      <motion.div variants={itemVariants} className="card border-brand-gold/20 mb-8">
        <p className="text-sm text-brand-muted">
          {isInterac
            ? "Une fois le virement reçu, vous recevrez un email de confirmation."
            : "Vous recevrez un email de confirmation à l'adresse associée à votre compte."}
          {" "}En cas de question, contactez-nous au{" "}
          <a href="tel:+15817457409" className="text-brand-gold">
            (581) 745-7409
          </a>
          .
        </p>
      </motion.div>

      {/* CTA buttons */}
      <motion.div variants={itemVariants} className="flex gap-4 justify-center">
        <Link href="/" className="btn-ghost gap-2">
          <Home className="w-4 h-4" /> Accueil
        </Link>
        <Link href="/booking" className="btn-primary gap-2">
          <Calendar className="w-4 h-4" /> Nouveau rendez-vous
        </Link>
      </motion.div>
    </motion.div>
  );
}
