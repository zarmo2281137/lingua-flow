/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['@andresaya/edge-tts', 'ws'],
  },
};

module.exports = nextConfig;
