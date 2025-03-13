import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['antd'],
  webpack(config) {
    return config;
  },
};

export default nextConfig;
