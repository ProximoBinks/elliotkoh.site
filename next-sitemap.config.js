/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://elliotkoh.dev',
  generateRobotsTxt: false, // We maintain robots.txt manually
  changefreq: 'monthly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*', '/admin'],
  // No lastmod: stamping every page with the build date tells search engines
  // everything changed on every deploy, which devalues the signal entirely.
  autoLastmod: false,
  transform: async (config, path) => {
    // Give the homepage highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
      };
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
    };
  },
};
