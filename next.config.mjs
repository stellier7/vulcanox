/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp']
  }
};

export default nextConfig;


