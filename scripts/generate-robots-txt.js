// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const crawlableRobotsTxt = `User-agent: *
Allow: /

Sitemap: https://${process.env.PUBLIC_ASSETS_DOMAIN}/sitemap.xml.gz`;

const uncrawlableRobotsTxt = `User-agent: *
Disallow: /`;

function generateRobotsTxt() {
  const robotsTxt =
    process.env.VERCEL_ENV === "production"
      ? crawlableRobotsTxt
      : uncrawlableRobotsTxt;

  fs.writeFileSync("public/robots.txt", robotsTxt);

  console.log(
    `Generated a ${
      process.env.VERCEL_ENV === "production" ? "crawlable" : "non-crawlable"
    } public/robots.txt`
  );
}

module.exports = generateRobotsTxt;
