/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Generate multiple sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Serve optimized formats
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 30 days (default is only 60 seconds)
    minimumCacheTTL: 2592000,
  },

  // Old standalone keyboard pages now live under /keyboards/<slug>
  async redirects() {
    return [
      {
        source: '/keycult-2-65',
        destination: '/keyboards/keycult-2-65',
        permanent: true,
      },
      {
        source: '/owlab-spring',
        destination: '/keyboards/owlab-spring',
        permanent: true,
      },
      {
        source: '/ai03-vega',
        destination: '/keyboards/ai03-vega',
        permanent: true,
      },
    ];
  },

  // Security & best-practice headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            // Report-only for now: watch the browser console for violations,
            // then rename to Content-Security-Policy once it's proven quiet.
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              // 'unsafe-inline' is needed for the GA bootstrap and Next's inline runtime scripts
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://www.google-analytics.com https://*.googletagmanager.com",
              "font-src 'self'",
              "connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
      {
        // Raw images (CSS backgrounds, full-res lightbox files) — cache for 30
        // days. New images get new filenames, so stale caches are not an issue.
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
