import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
- experimental: { typedRoutes: true }
+ typedRoutes: true
  }
};

export default nextConfig;
