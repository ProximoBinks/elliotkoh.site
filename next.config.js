/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Generate multiple sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Serve optimized formats
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
