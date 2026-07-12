import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next_cache",
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: ['**/node_modules', 'F:/WindowsApps/**'],
        poll: 1000,
      };
    }
    return config;
  },
};

export default nextConfig;
