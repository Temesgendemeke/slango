import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // for local testing

  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  images: {
    domains: ["res.cloudinary.com", "asset.cloudinary.com"],
  },

  outputFileTracingIncludes: {
    "app/**/*": ["generated/prisma/**"],
    "pages/api/**/*": ["generated/prisma/**"],

    "./path/to/your/server/side/utility/file.js": ["generated/prisma/**"],
    "./src/app/**/*.js": ["generated/prisma/**"],
    "./src/pages/api/**/*.js": ["generated/prisma/**"],
    "./lib/**/*.js": ["generated/prisma/**"],
    "./utils/**/*.js": ["generated/prisma/**"],
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_URL, 
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
