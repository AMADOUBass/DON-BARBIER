import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/portal/', '/api/'],
    },
    sitemap: 'https://donbarbier.beauty/sitemap.xml',
  }
}

