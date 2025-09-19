import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Linting NICHT im Build/Deploy ausführen → vermeidet Rushstack-Patch-Warnung
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
