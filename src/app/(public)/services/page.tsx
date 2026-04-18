import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { 
  Clock, 
  DollarSign, 
  ChevronRight, 
  Scissors, 
  Sparkles, 
  Flame, 
  Waves, 
  Palette, 
  User, 
  PlusCircle,
  Gem,
  Info
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Nos Services | Don Barbier",
  description: "Catalogue complet de coiffure afro et service de barbier premium à Québec. Fade, Locs, Tresses et Soins Barbe.",
};

const CATEGORY_LABELS: Record<string, string> = {
  classic: "Classiques",
  trending: "Tendances",
  fade: "Dégradés",
  design: "Art & Design",
  barbe: "Soins Barbe",
  locks: "Locs & Retwist",
  braids: "Tresses & Nattes",
  extra: "Soins & Plus",
};

const CATEGORY_ICONS: Record<string, any> = {
  classic: User,
  trending: Flame,
  fade: Scissors,
  design: Palette,
  barbe: Gem,
  locks: Sparkles,
  braids: Waves,
  extra: PlusCircle,
};

const CATEGORY_IMAGES: Record<string, string> = {
  locks: "/images/services/retwist.png",
  braids: "/images/services/braids.png",
  fade: "/images/services/specialized-fade.png",
  classic: "/images/services/classic-cut.png",
  trending: "/images/services/trending-style.png",
  design: "/images/services/design-art.png",
  barbe: "/images/services/beard-grooming.png",
  extra: "/images/services/extras-grooming.png",
};

const CATEGORY_ORDER = ["locks", "braids", "fade", "classic", "trending", "design", "barbe", "extra"];

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { basePrice: "asc" }],
    include: {
      stylistServices: {
        include: { stylist: { include: { user: { select: { name: true } } } } },
      },
    },
  });

  // Group by category
  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof services>>(
    (acc, cat) => {
      const items = services.filter((s) => s.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen pt-0 pb-20 bg-brand-black text-brand-beige">
      {/* 1. Hero / Header Section */}
      <section className="relative overflow-hidden pt-20 pb-16 bg-gradient-to-b from-brand-charcoal/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full border border-brand-gold/20 bg-brand-gold/5 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-4">
                L&apos;Art du Grooming & de l&apos;Afro
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Nos <span className="text-brand-gold">Services</span>
              </h1>
              <p className="text-brand-muted max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                Une expertise unique à Québec combinant la précision millimétrée du barbier vintage 
                et la maîtrise ancestrale des textures afro naturelles.
              </p>
            </div>
          </ScrollReveal>

          {/* 2. Visual Navigation Grid (Improved layout) */}
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16">
              {CATEGORY_ORDER.map((cat) => {
                const items = grouped[cat] || [];
                if (!items.length) return null;
                const Icon = CATEGORY_ICONS[cat] || Sparkles;
                return (
                  <a 
                    key={cat}
                    href={`#${cat}`}
                    className="group relative h-32 md:h-48 rounded-2xl overflow-hidden border border-brand-charcoal/50 hover:border-brand-gold/30 transition-all duration-500 bg-brand-charcoal/20"
                  >
                    <Image
                      src={CATEGORY_IMAGES[cat] || "/images/placeholder-service.png"}
                      alt={CATEGORY_LABELS[cat] ?? cat}
                      fill
                      className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-brand-gold" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/80">
                          {items.length} services
                        </span>
                      </div>
                      <h3 className="font-display text-sm md:text-lg font-bold group-hover:translate-x-1 transition-transform">
                        {CATEGORY_LABELS[cat]}
                      </h3>
                    </div>
                  </a>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Main Content Area with Sidebar Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Sidebar (Desktop only) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="p-6 rounded-2xl bg-brand-charcoal/20 border border-brand-charcoal/40">
                <h2 className="font-display text-xs font-bold uppercase tracking-widest text-brand-gold mb-6">
                  Navigation
                </h2>
                <nav className="space-y-1">
                  {CATEGORY_ORDER.map((cat) => {
                    const items = grouped[cat] || [];
                    if (!items.length) return null;
                    const Icon = CATEGORY_ICONS[cat] || Sparkles;
                    return (
                      <a 
                        key={cat}
                        href={`#${cat}`}
                        className="flex items-center justify-between group px-3 py-2.5 rounded-xl hover:bg-brand-gold/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-brand-muted group-hover:text-brand-gold" />
                          <span className="text-sm font-medium text-brand-muted group-hover:text-brand-beige">
                            {CATEGORY_LABELS[cat]}
                          </span>
                        </div>
                        <span className="text-[10px] text-brand-charcoal group-hover:text-brand-gold">
                          {items.length}
                        </span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Promo / Info Card */}
              <div className="p-6 rounded-2xl bg-brand-gold/5 border border-brand-gold/20 overflow-hidden relative group">
                <Gem className="w-12 h-12 text-brand-gold/10 absolute -right-2 -bottom-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-bold text-brand-gold mb-2">Membre Don</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Bénéficiez de tarifs exclusifs et d&apos;un accès prioritaire aux nouveaux créneaux.
                </p>
                <Link href="/login?tab=register" className="mt-4 block text-[10px] uppercase font-bold text-brand-beige hover:text-brand-gold tracking-widest transition-colors">
                  Devenir membre &rarr;
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Content (The Services) */}
          <main className="flex-1 space-y-24">
            {Object.entries(grouped).map(([cat, items]) => {
              const CategoryIcon = CATEGORY_ICONS[cat] || Sparkles;
              return (
                <section key={cat} id={cat} className="scroll-mt-32">
                  <ScrollReveal>
                    <div className="flex items-center justify-between mb-10 pb-4 border-b border-brand-charcoal/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                          <CategoryIcon className="w-6 h-6 text-brand-gold" />
                        </div>
                        <div>
                          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                            {CATEGORY_LABELS[cat]}
                          </h2>
                          <p className="text-[10px] uppercase tracking-widest text-brand-muted mt-1">
                            {items.length} services disponibles
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((service) => {
                      const priceNum = service.basePrice ? parseFloat(service.basePrice.toString()) : 0;
                      return (
                        <ScrollReveal key={service.id}>
                          <article className="group relative p-6 rounded-2xl bg-brand-charcoal/20 border border-brand-charcoal/40 hover:border-brand-gold/30 transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1 pr-4">
                                <h3 className="font-display text-lg font-bold group-hover:text-brand-gold transition-colors">
                                  {service.name}
                                </h3>
                                <div className="flex items-center gap-4 mt-2">
                                  <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                                    <Clock className="w-3.5 h-3.5 text-brand-gold/60" />
                                    {service.durationMins} min
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                                    <Info className="w-3.5 h-3.5 text-brand-gold/60" />
                                    Dépôt {Math.round(service.depositPct ?? 30)}%
                                  </div>
                                </div>
                              </div>
                              <div className="text-xl font-display font-bold text-brand-beige">
                                {formatPrice(priceNum)}
                              </div>
                            </div>

                            {service.description && (
                              <p className="text-sm text-brand-muted mb-6 leading-relaxed line-clamp-2">
                                {service.description}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-brand-charcoal/50">
                              <div className="flex -space-x-2">
                                {service.stylistServices.slice(0, 3).map((ss, idx) => (
                                  <div 
                                    key={idx} 
                                    className="w-8 h-8 rounded-full border-2 border-brand-black bg-brand-charcoal flex items-center justify-center text-[10px] font-bold text-brand-gold"
                                    title={ss.stylist.user.name ?? ""}
                                  >
                                    {ss.stylist.user.name?.[0]}
                                  </div>
                                ))}
                                {service.stylistServices.length > 3 && (
                                  <div className="w-8 h-8 rounded-full border-2 border-brand-black bg-brand-black flex items-center justify-center text-[10px] font-bold text-brand-muted">
                                    +{service.stylistServices.length - 3}
                                  </div>
                                )}
                              </div>
                              <Link
                                href={`/booking?serviceId=${service.id}`}
                                className="px-5 py-2 rounded-xl bg-brand-gold text-brand-black text-xs font-bold hover:bg-brand-beige transition-colors flex items-center gap-2"
                              >
                                Réserver <ChevronRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </article>
                        </ScrollReveal>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </main>
        </div>
      </div>

      {/* 4. CTA Section */}
      <section className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-12 rounded-3xl overflow-hidden text-center bg-brand-gold/5 border border-brand-gold/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50" />
          <Sparkles className="w-12 h-12 text-brand-gold mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Prêt pour votre transformation ?
          </h2>
          <p className="text-brand-muted max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
            Réservez en quelques clics le service qui sublimera votre style. 
            Besoin d&apos;assistance ? Notre équipe est là pour vous conseiller.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="px-8 py-4 rounded-2xl bg-brand-gold text-brand-black font-bold hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg shadow-brand-gold/10">
              Prendre rendez-vous
            </Link>
            <Link href="/contact" className="px-8 py-4 rounded-2xl border border-brand-charcoal text-brand-beige font-bold hover:bg-brand-charcoal/30 transition-all">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Mobile Nav — Sleek and Minimal */}
      <div className="fixed bottom-6 left-6 right-6 z-50 lg:hidden pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <div className="flex items-center gap-2 p-2 bg-brand-black/80 backdrop-blur-xl border border-brand-gold/20 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.7)] overflow-x-auto no-scrollbar">
            {CATEGORY_ORDER.map((cat) => {
              if (!(grouped[cat] || []).length) return null;
              const Icon = CATEGORY_ICONS[cat] || Sparkles;
              return (
                <a 
                  key={cat}
                  href={`#${cat}`}
                  className="p-3 rounded-xl bg-brand-charcoal/40 border border-transparent hover:border-brand-gold/30 hover:bg-brand-gold/10 transition-all shrink-0"
                >
                  <Icon className="w-5 h-5 text-brand-gold" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
