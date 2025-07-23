import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dealspotr.com",
        port: "",
        pathname: "/io-images/logo/tailus.jpg",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/68236786",
      },
    ]
  },
};

export default nextConfig;
