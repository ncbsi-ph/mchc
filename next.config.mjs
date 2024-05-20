/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-icons'],
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: 'localhost',
    //     port: '5219',
    //     pathname: '/images/**',
    //   },
    // ],
    domains: ['localhost'],
  },
};

export default nextConfig;
