"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import posthog from "posthog-js";
import { X, ShieldCheck, Cookie } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("Don Barbier_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    } else if (consent === "accepted") {
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("Don Barbier_cookie_consent", "accepted");
    posthog.opt_in_capturing();
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("Don Barbier_cookie_consent", "declined");
    posthog.opt_out_capturing();
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-24 sm:bottom-6 left-0 right-0 sm:left-auto sm:right-6 z-[100] p-4"
        >
          <div className="max-w-[440px] glass border border-brand-gold/20 shadow-gold-lg rounded-2xl overflow-hidden">
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-brand-gold" />
                </div>
                <h3 className="text-brand-beige font-display text-lg font-bold">
                  Respect de votre vie privée
                </h3>
              </div>
              <p className="text-brand-muted text-[13px] leading-relaxed">
                Nous utilisons des cookies pour optimiser votre expérience et sécuriser vos transactions. 
                Consultez notre <Link href="/privacy" className="text-brand-gold underline hover:no-underline">Politique</Link>.
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handleDecline}
                  className="flex-1 btn-outline px-4 py-2 text-xs whitespace-nowrap"
                >
                  Décliner
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 btn-primary px-4 py-2 text-xs whitespace-nowrap"
                >
                  Accepter
                </button>
              </div>
            </div>

            <button 
              onClick={() => setShowBanner(false)}
              className="absolute top-4 right-3 text-brand-muted hover:text-brand-gold transition-colors p-1"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

