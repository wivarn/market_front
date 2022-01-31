/* eslint-disable @typescript-eslint/no-var-requires */
const generateRobotsTxt = require("./scripts/generate-robots-txt");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: [`${process.env.PUBLIC_ASSETS_DOMAIN}`],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  swcMinify: true,
  webpack(config, { isServer }) {
    if (isServer) {
      generateRobotsTxt();
    }
    return config;
  },
});
