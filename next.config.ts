import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.etsystatic.com',
      },
    ],
  },
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
