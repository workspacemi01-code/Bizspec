import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

/** Every page worth indexing. Legal pages are included because people search
 *  for them directly. */
const paths = [
  "",
  "/services",
  "/services/zoho",
  "/products",
  "/academy",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : path.startsWith("/services") ? 0.8 : 0.6,
  }));
}
