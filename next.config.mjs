/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://bikerapp-backend-694862036731.asia-south1.run.app/:path*',
      },
    ];
  },
};

export default nextConfig;