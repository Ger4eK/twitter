/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com'],
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  },
};
