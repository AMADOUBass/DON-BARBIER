import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Réserver un rendez-vous", href: "/booking" },
    { label: "Nos services", href: "/#services" },
    { label: "L'équipe", href: "/team" },
    { label: "Galerie", href: "/gallery" },
  ],
  boutique: [
    { label: "Produits", href: "/shop" },
    { label: "Kits pour locs", href: "/shop?category=kits" },
    { label: "Soins capillaires", href: "/shop?category=soins" },
    { label: "Accessoires", href: "/shop?category=accessoires" },
  ],
  legal: [
    { label: "Politique de confidentialité", href: "/privacy" },
    { label: "Conditions d'utilisation", href: "/terms" },
    { label: "Retours & Échanges", href: "/returns" },
    { label: "Politique de remboursement", href: "/refunds" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-charcoal border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-3xl font-bold text-brand-gold">
              Le Don Barbier
            </Link>
            <p className="mt-4 text-brand-muted text-sm leading-relaxed max-w-xs">
              Barbershop premium fondé par Elvis &quot;Don&quot; Berwa. L&quot;excellence du grooming et de la coiffure
              afro à Québec. <span className="text-brand-gold font-medium">#BÉNITSOITLAMAIN</span>
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="https://maps.google.com/?q=2880+Av.+Duval+Quebec+QC+G1L+4N3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-brand-muted hover:text-brand-gold transition-colors"
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-gold" />
                2880 Av. Duval, Québec, QC G1L 4N3
              </a>
              <a
                href="tel:+14189299552"
                className="flex items-center gap-3 text-sm text-brand-muted hover:text-brand-gold transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0 text-brand-gold" />
                (418) 929-9552
              </a>
            </div>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/ledonbarbier/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
                aria-label="Suivre Le Don Barbier sur Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/ledonbarbier/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
                aria-label="Suivre Le Don Barbier sur Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-widest mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutique */}
          <div>
            <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-widest mb-4">
              Boutique
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.boutique.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-widest mb-4">
              Légal
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">
            © {new Date().getFullYear()} Le Don Barbier. Tous droits réservés.
          </p>
          <p className="text-xs text-brand-muted">
            L&apos;Excellence du Grooming Afro à Québec
          </p>
        </div>
      </div>
    </footer>
  );
}

