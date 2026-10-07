/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages (output goes to ./out on `next build`).
  output: "export",
  images: { unoptimized: true },
};

module.exports = nextConfig;
