import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/layout/Providers";
import { ConditionalShell } from "@/components/layout/ConditionalShell";
import { Toaster } from "react-hot-toast";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Le Don Barbier — Excellence du Grooming & Coiffure Afro à Québec",
    template: "%s | Le Don Barbier",
  },
  description:
    "Barbershop de luxe fondé par Elvis 'Don' Berwa à Québec. Spécialiste du grooming masculin, des locs et de la maîtrise des textures afro. #BÉNITSOITLAMAIN",
  keywords: [
    "Elvis Berwa",
    "Le Don Barbier",
    "barbier afro Québec",
    "salon locs Québec",
    "grooming masculin prestige",
    "BÉNITSOITLAMAIN",
    "barbershop de luxe Québec",
  ],
  authors: [{ name: "Elvis Berwa" }],
  creator: "Elvis Berwa",
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: "https://donbarbier.beauty",
    siteName: "Le Don Barbier",
    title: "Le Don Barbier — Excellence du Grooming & Coiffure Afro",
    description:
      "Barbershop de luxe à Québec spécialisé en coiffures afro, locs et grooming masculin.",
    images: [{ url: "/og-image-premium.png", width: 1200, height: 630, alt: "Le Don Barbier Salon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Don Barbier — Salon Locs & Coiffures Afro",
    description: "Salon premium spécialisé en locs et coiffures afro à Québec.",
    images: ["/og-image-premium.png"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://donbarbier.beauty"),
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-db.png",
    apple: [
      { url: "/logo-db.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Don Barbier",
    statusBarStyle: "black-translucent",
  },
  verification: {
    google: "BD8g4gg6BkZJzfjsj5o1MyGB8TKit30ejFhRmvJL6nQ",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  "name": "Le Don Barbier",
  "image": "https://donbarbier.beauty/og-image-premium.png",
  "@id": "https://donbarbier.beauty",
  "url": "https://donbarbier.beauty",
  "telephone": "+14189299552",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2880 Av. Duval",
    "addressLocality": "Qu\u00e9bec",
    "addressRegion": "QC",
    "postalCode": "G1L 4N3",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 46.8372,
    "longitude": -71.2291
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/ledonbarbier/",
    "https://www.instagram.com/ledonbarbier/",
    "https://linktr.ee/ledonbarbier"
  ],
  "priceRange": "$$"
};

export const viewport: Viewport = {
  themeColor: "#C9A84C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};



import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PostHogPageView from "@/components/layout/PostHogPageView";
import { CookieConsent } from "@/components/layout/CookieConsent";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${outfit.variable}`}>
      <head>
        <link rel="preconnect" href="https://us-assets.i.posthog.com" />
        <link rel="preconnect" href="https://us.i.posthog.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-black text-brand-beige">
        <PostHogPageView />
        <CookieConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <ConditionalShell>{children}</ConditionalShell>

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1A1A1A",
                color: "#F5EDD6",
                border: "1px solid rgba(201,168,76,0.3)",
              },
            }}
          />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

