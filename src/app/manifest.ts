import type { MetadataRoute } from "next";
import { site, siteUrl } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.title}`,
    short_name: site.brand,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0d0e0f",
    theme_color: "#0d0e0f",
    icons: [
      { src: `${siteUrl}/icons/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${siteUrl}/icons/icon-512.png`, sizes: "512x512", type: "image/png" },
      { src: `${siteUrl}/icon.svg`, sizes: "any", type: "image/svg+xml" },
    ],
  };
}
