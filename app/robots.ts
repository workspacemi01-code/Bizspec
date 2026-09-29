import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing to crawl behind the enquiry endpoint.
      disallow: ["/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
