import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  // Cloudflare Pages متوافق
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "shamela.ws" },
      { protocol: "https", hostname: "**.shamela.ws" },
    ],
  },

  // Proxy لتجاوز CORS: توجيه طلبات /r2-books/* إلى R2
  // هذا يجعل المتصفح يطلب من نفس النطاق (لا CORS)
  async rewrites() {
    return [
      {
        source: "/r2-books/:urlType/:bookNumber.json",
        destination:
          "https://pub-527cd05a026a41dc9348c1e0c66bc0a6.r2.dev/:urlType/:bookNumber.json",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
