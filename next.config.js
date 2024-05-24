/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing configuration goes here
  // For example:
  // reactStrictMode: true,
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
