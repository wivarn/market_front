/* eslint-disable @typescript-eslint/no-var-requires */
const generateRobotsTxt = require("./scripts/generate-robots-txt");
const path = require("path");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
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
    config.resolve.alias["@babel/runtime"] = path.resolve(
      __dirname,
      "node_modules",
      "@babel/runtime"
    );
    config.resolve.alias["regenerator-runtime"] = path.resolve(
      __dirname,
      "node_modules",
      "regenerator-runtime"
    );
    if (isServer) {
      generateRobotsTxt();
    }
    return config;
  },
});
