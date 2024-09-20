/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-icons'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mchcapi.comlogikph.com',
        pathname: '/images/**',
      },
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   pathname: '/images/**',
      //   port: '5219',
      // },
    ],
    // domains: ['localhost'],
  },
};

export default nextConfig;
