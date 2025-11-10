import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      "images.unsplash.com",
      "picsum.photos",
      "www.rofu.net", 
    ],
  },
};

export default nextConfig;
