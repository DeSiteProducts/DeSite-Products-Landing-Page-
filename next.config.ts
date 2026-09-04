import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolvemos contra la ubicación de este archivo, no contra el cwd del proceso:
// hay un package-lock.json en el home del usuario y `next` infiere mal la raíz.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: projectRoot },

  images: {
    /**
     * AVIF first, WebP behind it. The photographs on this page are the whole
     * payload — the originals add up to about 10 MB — and AVIF cuts a shop
     * photograph to roughly a fifth of its JPEG size at the same quality.
     */
    formats: ["image/avif", "image/webp"],
    /**
     * Rungs close enough together that a retina slot does not have to round up
     * to the next one. A gallery panel is ~600 CSS px wide, so at 2x it asks
     * for 1200-1280 device px; without a rung there it fetched the 1920 and
     * threw a third of it away.
     */
    deviceSizes: [640, 750, 828, 1080, 1280, 1536, 1920],
    imageSizes: [96, 128, 160, 256, 384],
    /** Optimised files are immutable, so let the CDN keep them for a year. */
    minimumCacheTTL: 31536000,
    qualities: [70, 80],
    remotePatterns: [
      // Vimeo poster frames and video thumbnails.
      { protocol: "https", hostname: "i.vimeocdn.com" },
    ],
  },

  async headers() {
    return [
      {
        // The originals under /public are content-addressed by hand: a photo is
        // never edited in place, it is replaced under a new name.
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
