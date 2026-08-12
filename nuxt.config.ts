import { siteConfig } from './configs/siteConfig'
import { pwa } from './configs/pwa'
import { i18n } from './configs/i18n'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxtjs/sitemap',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/ui',
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },

  app: {
    // If host it on https://example.com
    //    baseURL: '/'
    // Else if host it on https://example.com/markdown-resume/
    //    baseURL: '/markdown-resume/'
    baseURL: siteConfig.baseURL, // baseURL: '/<repository>/'
    buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'canonical', href: `${siteConfig.url}${siteConfig.baseURL}` },
        { rel: 'apple-touch-icon', href: `${siteConfig.baseURL}apple-touch-icon.png` },
        { rel: 'mask-icon', href: `${siteConfig.baseURL}safari-pinned-tab.svg`, color: '#222' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: siteConfig.description },
        { name: 'application-name', content: siteConfig.title },
        { name: 'apple-mobile-web-app-title', content: siteConfig.title },
        { name: 'msapplication-TileColor', content: '#fff' },
        { property: 'og:site_name', content: siteConfig.title },
        { property: 'og:title', content: siteConfig.title },
        { property: 'og:description', content: siteConfig.description },
        { property: 'og:url', content: `${siteConfig.url}${siteConfig.baseURL}` },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:image', content: siteConfig.image },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:site', content: '@JunianDev' },
        { property: 'twitter:title', content: siteConfig.title },
        { property: 'twitter:description', content: siteConfig.description },
        { property: 'twitter:image', content: siteConfig.image },
      ],
    },
  },

  css: [
    'katex/dist/katex.min.css',
    '~/assets/css/main.css',
  ],

  site: {
    url: siteConfig.url,
  },

  colorMode: {
    preference: 'system',
    classSuffix: '',
  },

  runtimeConfig: {
    public: {
      googleFontsKey: '',
      disqusShortname: '',
    },
  },
  srcDir: 'app/',

  compatibilityDate: '2026-08-10',

  nitro: {
    runtimeConfig: {},
    prerender: {
      routes: ['/robots.txt'],
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          // Use the CJS type definitions of markdown-it, which expose the
          // namespace members (Renderer, ParserBlock, Token, etc.) that the
          // ESM entry from @types/markdown-it omits.
          'markdown-it': ['../node_modules/@types/markdown-it/dist/index.cjs.d.ts'],
        },
      },
    },
  },

  eslint: {
    config: {
      stylistic: true, // <---
    },
  },

  i18n,

  icon: {
    clientBundle: {
      scan: true,
    },
  },

  pwa,

  scripts: {
    registry: {
      googleAnalytics: { trigger: 'onNuxtReady' },
    },
  },

  sitemap: {
    zeroRuntime: true,
  },

})
