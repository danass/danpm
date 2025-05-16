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
    }
  };

export default nextConfig;


