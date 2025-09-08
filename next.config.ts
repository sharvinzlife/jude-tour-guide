import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable source maps to prevent errors
  productionBrowserSourceMaps: false,
  // Fix CSS MIME type issues and encoding
  async headers() {
    return [
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/_next/static/media/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  webpack: (config, { isServer, dev }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'source-map': require.resolve('source-map'),
    };
    
    // Fix 'self is not defined' error in server-side rendering
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Use Next.js default chunk splitting to ensure stable module evaluation order
    // in the App Router. Overriding splitChunks can cause runtime factory errors in
    // some routes and should be avoided unless absolutely necessary.
    
    // Disable source map generation to prevent errors
    if (!dev) {
      config.devtool = false;
    }
    
    return config;
  },
};

export default withNextIntl(nextConfig)