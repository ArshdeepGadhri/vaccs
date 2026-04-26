import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/dashboard/*'], // Protect authenticated routes
    },
    sitemap: 'https://vaccs.vercel.app/sitemap.xml',
  }
}
