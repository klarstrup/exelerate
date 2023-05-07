/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  rewrites: () => [
    { source: "/tech", destination: "/tech/index.html" },
    { source: "/", destination: "/" },
  ],
};

module.exports = nextConfig;
