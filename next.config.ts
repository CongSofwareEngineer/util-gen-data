import type { NextConfig } from 'next'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

const nextConfig: NextConfig = {
  transpilePackages: ['zustand', '@tanstack/react-query', 'query-string'],
  // Page images (cover, album, avatar) are served from Cloudinary
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' }],
  },

  productionBrowserSourceMaps: !isProduction,
  enablePrerenderSourceMaps: !isProduction,
  compress: isProduction,
  reactStrictMode: isProduction,
  cleanDistDir: isProduction,
  experimental: {
    optimizePackageImports: ['@tanstack/react-query', 'zustand'],
  },
  compiler: {
    removeConsole: isProduction,
  },
}

if (!isProduction) {
  nextConfig.allowedDevOrigins = ['localhost', '*.localhost', '192.168.50.253', '*.trycloudflare.com']
}

export default nextConfig
