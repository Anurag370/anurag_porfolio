import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `cacheComponents` stays off: the portfolio is a fully static site that
  // relies on `generateStaticParams` + `dynamicParams` for project/blog
  // routes. Turn it on only if you need PPR-style caching.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
