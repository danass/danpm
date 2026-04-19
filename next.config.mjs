/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      esmExternals: true
    },
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.homeexchange.fr',
          port: '',
          pathname: '/images/**',
        },
        {
          protocol: 'https',
          hostname: 'images.homeexchange.com',
          port: '',
          pathname: '/images/**',
        },
         {
          protocol: 'https',
          hostname: 'cdn-images.homeexchange.com',
          port: '',
          pathname: '/images/**',
        }
        ,
         {
          protocol: 'https',
          hostname: '*.homeexchange.com',
          port: '',
          pathname: '/**',
        }
      ],
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
            { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
            { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          ],
        },
      ]
    },
  };

export default nextConfig;
