/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing configuration
  reactStrictMode: true, // Example configuration
  webpack(config, { isServer }) {
    // Bundle analyzer configuration
    if (process.env.ANALYZE === "true") {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }

    // Example: Exclude certain modules from serverless functions
    if (isServer) {
      config.externals = ["sharp"]; // Replace 'sharp' with other modules if necessary
    }

    return config;
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
