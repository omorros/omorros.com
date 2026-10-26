/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF first, WebP fallback: same visual quality at a fraction of the JPEG
    // size. Only on Vercel: a local `next start` encoding many AVIFs at once
    // (the browser checks do) can stall and never answer, so local servers
    // serve WebP.
    formats: process.env.VERCEL ? ['image/avif', 'image/webp'] : ['image/webp'],
    // No remote hosts: every image lives in public/, so a renamed file or a
    // private repo elsewhere can never break the site.
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ],
}

module.exports = nextConfig
