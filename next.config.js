/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lottie-react', 'lottie-web'], // ✅ Правильное размещение
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
