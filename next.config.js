/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: () => [{ source: "/tech", destination: "/tech/index.html" }],
};

module.exports = nextConfig;
