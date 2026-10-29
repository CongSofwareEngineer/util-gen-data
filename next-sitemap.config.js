// Logged-in areas and private invitation pages stay out of the sitemap and are disallowed for crawlers
const PRIVATE_PATHS = ['/admin', '/admin/*', '/tao-thiep', '/trang-cua-toi', '/vi', '/gioi-thieu', '/doi-mat-khau', '/thiep/*', '/manifest.json']

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://giatuisieusach.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: PRIVATE_PATHS,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/tao-thiep', '/trang-cua-toi', '/vi', '/gioi-thieu', '/doi-mat-khau', '/thiep/'],
      },
    ],
  },
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : 0.6,
    lastmod: new Date().toISOString(),
  }),
}
