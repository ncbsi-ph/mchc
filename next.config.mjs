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
    ],
    // domains: ['localhost'],
  },
};

export default nextConfig;
