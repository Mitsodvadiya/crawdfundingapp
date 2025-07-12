import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [path.resolve(__dirname, 'node_modules')],
    };
    config.watchOptions = {
      ignored: ['**/Application Data/**', '**/C:/Users/**'],
    };

    return config;
  },
};

export default nextConfig;
