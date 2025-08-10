/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: '/_next/image',
    loader: 'default',
    formats: ['image/webp'],
    domains: ['jszchnsbkfvpczxypimw.supabase.co', 'images.unsplash.com'],
  },
  // experimental: {
  //   appDir: true,  // This is deprecated in Next.js 14+
  // },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
