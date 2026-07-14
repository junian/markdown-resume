import { siteConfig } from "./configs/siteConfig";
import { pwa } from "./configs/pwa";
import { i18n } from "./configs/i18n";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",

  modules: [
    "@vueuse/nuxt",
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@vite-pwa/nuxt",
    "nuxt-gtag",
    "nuxt-clarity-analytics",
    "nuxt-simple-sitemap"
  ],

  css: [
    "@unocss/reset/tailwind.css",
    "katex/dist/katex.min.css",
    "~/assets/css/index.css"
  ],

  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],

  i18n,

  runtimeConfig: {
    public: {
      googleFontsKey: "",
      disqusShortname: ""
    }
  },

  colorMode: {
    preference: "light",
    classSuffix: ""
  },

  app: {
    // If host it on https://example.com
    //    baseURL: '/'
    // Else if host it on https://example.com/markdown-resume/
    //    baseURL: '/markdown-resume/'
    baseURL: siteConfig.baseURL, // baseURL: '/<repository>/'
    buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids
    head: {
      viewport: "width=device-width,initial-scale=1",
      link: [
        { rel: "canonical", href: `${siteConfig.url}${siteConfig.baseURL}` },
        { rel: "apple-touch-icon", href: `${siteConfig.baseURL}apple-touch-icon.png` },
        { rel: "mask-icon", href: `${siteConfig.baseURL}safari-pinned-tab.svg`, color: "#222" }
      ],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: siteConfig.description },
        { name: "application-name", content: siteConfig.title },
        { name: "apple-mobile-web-app-title", content: siteConfig.title },
        { name: "msapplication-TileColor", content: "#fff" },
        { property: "og:site_name", content: siteConfig.title },
        { property: "og:title", content: siteConfig.title },
        { property: "og:description", content: siteConfig.description },
        { property: "og:url", content: `${siteConfig.url}${siteConfig.baseURL}` },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_US" },
        { property: "og:image", content: siteConfig.image },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:site", content: "@JunianDev" },
        { property: "twitter:title", content: siteConfig.title },
        { property: "twitter:description", content: siteConfig.description },
        { property: "twitter:image", content: siteConfig.image },
      ]
    }
  },

  site: {
    url: siteConfig.url
  },

  pwa,

  nitro: {
    runtimeConfig: {}
  },

  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || ""
  }

});
