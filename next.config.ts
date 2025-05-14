import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"], // Add allowed image domains here
  },
};

export default nextConfig;
