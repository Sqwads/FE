import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true, // Temporary during debugging
  },
  experimental: {
    typedRoutes: true, 
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:4000/api/:path*' 
          : 'http://16.171.155.101:3000/api/:path*',
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config: Configuration) => {
    config.cache = true;
    return config;
  },
  images: {
    domains: ['your-domain.com'],
  }
};

export default nextConfig;