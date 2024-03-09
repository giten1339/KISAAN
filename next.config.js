/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["lh3.googleusercontent.com", "i.ibb.co"],
   },
   experimental: {
      serverActions: true,
      isrMemoryCacheSize: 50,
   },
};

module.exports = nextConfig;
