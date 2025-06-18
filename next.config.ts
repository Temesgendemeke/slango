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
};

export default nextConfig;
