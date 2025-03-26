import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Keep your existing config options here */

  webpack(config) {
    // Add SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
