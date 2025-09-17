/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => [
    { source: "/tech", destination: "/rider", permanent: false },
    { source: "/tech/iem", destination: "/rider", permanent: false },
  ],
  rewrites: () => [
    { source: "/rider", destination: "/rider/index.html" },
    { source: "/tech/no-iem", destination: "/tech/no-iem.html" },
  ],
};

module.exports = nextConfig;
