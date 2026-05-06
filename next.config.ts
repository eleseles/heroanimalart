import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/catalog.xml',
        destination: '/api/catalog',
      },
    ];
  },
};

export default nextConfig;
