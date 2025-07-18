import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // other options…

  eslint: {
    // Allow production builds to complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
