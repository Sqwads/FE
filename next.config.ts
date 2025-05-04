import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development', // Only ignore in dev
  },
  experimental: {
    typedRoutes: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_BASE_URL || 
          (process.env.NODE_ENV === 'development' 
            ? 'http://localhost:4000' 
            : 'http://16.171.155.101:3000')}/api/:path*`,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development', // Only ignore in dev
  },webpack: (config: Configuration, { isServer }) => {
    config.cache = true;
    
    // Initialize resolve if it doesn't exist
    config.resolve = config.resolve || {};
    
    // Add fallbacks safely
    config.resolve.fallback = {
      ...config.resolve.fallback, // Preserve existing fallbacks
      fs: false,
      path: false
    };
    
    return config;
  },
  images: {
    domains: [
      'your-domain.com',
      // Add other domains as needed
    ],
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
  },
  // Security enhancements:
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
};

export default nextConfig;