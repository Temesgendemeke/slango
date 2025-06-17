import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  images: {
    domains: ["res.cloudinary.com", "asset.cloudinary.com"],
  },
};

export default nextConfig;
