import type { NextConfig } from "next";

/**
 * Sub-path the site is served under. Empty for a root domain (S3/CloudFront,
 * or a custom domain on GitHub Pages); "/Anuj---Portfolio" for the default
 * GitHub Pages project URL. The Pages workflow sets it from
 * actions/configure-pages, so adding a custom domain later needs no change.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
