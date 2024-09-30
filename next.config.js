/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: () => [
    { source: "/tech", destination: "/tech/index.html" },
    { source: "/tech/iem", destination: "/tech/index.html" },
    { source: "/tech/no-iem", destination: "/tech/no-iem.html" },
  ],
};

module.exports = nextConfig;
