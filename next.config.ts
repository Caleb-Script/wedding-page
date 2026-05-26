import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minio.omnixys.com",
      },

      {
        protocol: "https",
        hostname: "s3.omnixys.com",
      },

      {
        protocol: "https",
        hostname: "cdn.omnixys.com",
      },
    ],
  },

  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
