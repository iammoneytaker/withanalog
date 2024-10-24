export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/adminsangwon/', '/api/'],
      },
    ],
    sitemap: 'https://withanalog.com/sitemap.xml',
  };
}
