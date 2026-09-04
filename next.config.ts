import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolvemos contra la ubicación de este archivo, no contra el cwd del proceso:
// hay un package-lock.json en el home del usuario y `next` infiere mal la raíz.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: projectRoot },
};

export default nextConfig;
