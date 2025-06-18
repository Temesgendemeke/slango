import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // Add this temporarily for local testing

  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  images: {
    domains: ["res.cloudinary.com", "asset.cloudinary.com"],
  },

  outputFileTracingIncludes: {
      // **CRITICAL:** These keys (e.g., 'app/**/*', 'pages/api/**/*')
      // must exactly match the paths of your server-side Next.js functions/routes.
      // The values are globs relative to your project root.

      "app/**/*": ["generated/prisma/**"],
      "pages/api/**/*": ["generated/prisma/**"],

      // Add any other server-side entry points that use Prisma Client
      // For example, if you have a utility file like `src/lib/db.ts` or `utils/prisma.ts`:
      // If your 'generated' folder is at the root of your project:
      "./path/to/your/server/side/utility/file.js": ["generated/prisma/**"],
      "./src/app/**/*.js": ["generated/prisma/**"], // If your `app` directory is inside `src`
      "./src/pages/api/**/*.js": ["generated/prisma/**"], // If your `pages` directory is inside `src`
      "./lib/**/*.js": ["generated/prisma/**"], // If you have a `lib` folder at the root
      "./utils/**/*.js": ["generated/prisma/**"], // If you have a `utils` folder at the root
    },
};

export default nextConfig;
