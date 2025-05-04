/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  experimental: {
      missingSuspenseWithCSRBailout: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match API requests
        // destination: 'http://16.171.155.101:3000/api/:path*', // Proxy to your backend
        destination:'http://localhost:4000/api/:path*'
      },
    ];
  },
  eslint:{
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
