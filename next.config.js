// eslint-disable-next-line @typescript-eslint/no-var-requires
const generateRobotsTxt = require("./scripts/generate-robots-txt");

module.exports = {
  images: {
    domains: [`${process.env.PUBLIC_ASSETS_DOMAIN}`],
  },
  swcMinify: true,
  webpack(config, { isServer }) {
    if (isServer) {
      generateRobotsTxt();
    }
    return config;
  },
};
