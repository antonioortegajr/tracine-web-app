import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  turbopack: {},
  output: "export",
  basePath: "/tracine-web-app",
  images: { unoptimized: true },
};

export default withPWA({ dest: "public", disable: process.env.NODE_ENV === "development" })(nextConfig);
