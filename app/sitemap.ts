import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

/**
 * One page, so one entry. The models live on it as anchors; Google indexes
 * those through the page itself, not as separate URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
