import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Don Barbier Salon",
    short_name: "Don Barbier",
    description: "Salon premium spécialisé en dégradés, barbes et coiffures afro de haute précision à Québec.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#C9A84C",
    icons: [
      {
        src: "/logo-db.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo-db.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo-db.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

