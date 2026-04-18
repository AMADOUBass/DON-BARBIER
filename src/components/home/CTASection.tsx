"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-brand-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-brand-gold text-sm font-medium uppercase tracking-widest mb-4">Prêt ?</p>
          <h2 className="section-title mb-6">
            Réservez votre moment<br />
            <span className="text-brand-gold italic">Signature</span>
          </h2>
          <p className="text-brand-muted mb-10 max-w-xl mx-auto">
            Offrez-vous l'expertise Don Barbier. Réservez en ligne avec un dépôt sécurisé
            ou appelez-nous directement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-primary w-full sm:w-auto text-base px-8 py-4 gap-2">
              <Calendar className="w-5 h-5" />
              Réserver en ligne
            </Link>
            <a href="tel:+14189299552" className="btn-outline w-full sm:w-auto text-base px-8 py-4 gap-2">
              <Phone className="w-5 h-5" />
              (418) 929-9552
            </a>
          </div>

          <p className="mt-8 text-xs text-brand-muted">
            2880 Av. Duval, Quebec, Quebec G1L 4N3 · donbarbier@gmail.com
          </p>
        </motion.div>
      </div>
    </section>
  );
}

