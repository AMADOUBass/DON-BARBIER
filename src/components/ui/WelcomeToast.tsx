"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";

export function WelcomeToast() {
  const { data: session, status } = useSession();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (status !== "authenticated" || !session?.user) return;

    // Only show once per browser session (not every page load)
    const key = `welcome_shown_${session.user.id ?? session.user.email}`;
    if (sessionStorage.getItem(key)) return;

    sessionStorage.setItem(key, "1");
    fired.current = true;

    const firstName = session.user.name?.split(" ")[0] ?? "toi";

    // Small delay so the page settles
    const timer = setTimeout(() => {
      toast.custom(
        (t) => (
          <div
            className={`flex items-center gap-3 bg-brand-charcoal border border-brand-gold/30 rounded-xl px-5 py-4 shadow-2xl transition-all duration-300 ${
              t.visible ? "animate-enter opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-brand-gold" />
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-beige">
                Bienvenue, {firstName} ! ✨
              </p>
              <p className="text-xs text-brand-muted mt-0.5">
                {session.user.role === "ADMIN"
                  ? "Accès Admin actif — tout est sous contrôle."
                  : session.user.role === "STYLIST"
                  ? "Ton portail styliste t'attend."
                  : "Ton espace Don Barbier est prêt."}
              </p>
            </div>
          </div>
        ),
        { duration: 4000, position: "top-right" }
      );
    }, 800);

    return () => clearTimeout(timer);
  }, [session, status]);

  return null;
}
