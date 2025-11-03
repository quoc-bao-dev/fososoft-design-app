import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  eslint: {
    // Tắt ESLint trong quá trình build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Bỏ qua lỗi TypeScript trong quá trình build
    ignoreBuildErrors: true,
  },
  experimental: {
    // Giảm JS ban đầu
    optimizeCss: true,
    scrollRestoration: true,
  },
  images: {
    // unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Kích thước thiết bị hỗ trợ
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Kích thước hình ảnh
  },
  async headers() {
    return [
      {
        source: "/icons/(.*)", // Cache tất cả hình ảnh trong thư mục `/public/icons`
        // source: "/_next/image(.*)", // Cache tất cả hình ảnh tối ưu của Next.js
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Cache 1 năm
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
