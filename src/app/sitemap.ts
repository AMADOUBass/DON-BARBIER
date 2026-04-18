import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://donbarbier.beauty";
  
  const routes = [
    "",
    "/club",
    "/booking",
    "/services",
    "/shop",
    "/team",
    "/gallery",
    "/faq",
    "/contact",
    "/terms",
    "/privacy",
    "/refunds",
    "/returns",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
