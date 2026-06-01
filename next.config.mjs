/** @type {import('next').NextConfig} */

// Static export for GitHub Pages. The site is served from a project subpath
// (https://<user>.github.io/swathis-portfolio/), so assets need that base.
const isProd = process.env.NODE_ENV === "production";
const repo = "swathis-portfolio";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;
