// eslint-disable-next-line @typescript-eslint/no-var-requires
const generateRobotsTxt = require("./scripts/generate-robots-txt");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

// eslint-disable-next-line @typescript-eslint/no-var-requires
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
    config.plugins.push(new DuplicatePackageCheckerPlugin());
    if (isServer) {
      generateRobotsTxt();
    }
    return config;
  },
});
