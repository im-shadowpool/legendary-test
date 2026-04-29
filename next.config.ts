import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms-magnetme.teamelephant.me",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
