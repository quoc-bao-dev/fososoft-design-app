/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://fososoft.com', // ✅ Domain chính
  generateRobotsTxt: true,         // ✅ Tự động tạo robots.txt
  sitemapSize: 5000,               // ✅ Mỗi sitemap chứa tối đa 5000 link
  changefreq: 'weekly',            // ✅ Tần suất cập nhật (weekly, daily, etc.)
  priority: 0.7,                   // ✅ Độ ưu tiên SEO cho trang

  // ✅ Loại trừ các route không nên xuất hiện trong sitemap
  exclude: [
    '/admin',
    '/private',
    '/auth/*',
    '/api/*'
  ],

  // ✅ Thêm sitemap phụ (nếu có)
  additionalSitemaps: [
    // 'https://fososoft.com/sitemap-blog.xml'
  ],

  // ✅ Tuỳ chỉnh file robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*?bet*',
          '/*?doc*',
          '/*?cwin*'
        ]
      },
    ],
  },

  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(), // ✅ Tự động tạo lastmod cho từng URL
      changefreq: config.changefreq,
      priority: config.priority,
    }
  },
}

module.exports = config;