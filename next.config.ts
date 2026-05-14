import type { NextConfig } from "next";

const redirectsList = [
  {
    source: "/links",
    destination: "/",
    permanent: true,
  },
  {
    source: "/home",
    destination: "/",
    permanent: true,
  },
  {
    source: "/photo-magnets-franchise-opportunity",
    destination: "/franchise",
    permanent: true,
  },
];

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  poweredByHeader: false,

  compress: true,

  productionBrowserSourceMaps: false,

  experimental: {
    optimizePackageImports: ["gsap", "lucide-react"],
  },

  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],

    formats: ["image/avif", "image/webp"],

    deviceSizes: [640, 750, 828, 1080, 1200, 1600],

    imageSizes: [16, 32, 48, 64, 96, 128, 256],

    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async redirects() {
    return redirectsList;
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
