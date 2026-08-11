import { siteConfig } from '../../../configs/siteConfig'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  const sitemapUrl = `${siteConfig.url}${siteConfig.baseURL}sitemap_index.xml`

  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapUrl}`].join('\n')
})
