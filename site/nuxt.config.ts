import { pwa } from "./configs/pwa";
import { i18n } from "./configs/i18n";

const siteConfig = {
  title: "Free Markdown Resume App",
  description: "Free online resume maker, allows you to create your resume in minutes with Markdown!",
  image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiqtAGRJE-GkyEUNR44rnmHypGIiNLF7LB2XVVblX0l1g4TLWuwjIRM-8JV1fhZViZifolvF3STooaj-3vMUHuQsZWXul_y-EJBAWvRHaSQ54zKJdX072hdFVJ-Xu4ReyICWQ1S0RMbY2ZCC1R12dzkI4xPMQpP4zVc4WyVOQMvn2LDghmWMWJv91SccHA/s1600/markdown-resume.jpg",
  canonicalUrl: "https://www.junian.dev/markdown-resume/"
};

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
    "nuxt-simple-sitemap",
    "nuxt-gtag"
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

  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID
  },

  runtimeConfig: {
    public: {
      googleFontsKey: ""
    }
  },

  colorMode: {
    preference: "light",
    classSuffix: ""
  },

  app: {
    // If host it on https://example.com
    //    baseURL: '/'
    // Else if host it on https://example.com/resume
    //    baseURL: '/resume/'
    baseURL: '/markdown-resume/', // baseURL: '/<repository>/'
    buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids
    head: {
      viewport: "width=device-width,initial-scale=1",
      link: [
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#222" }
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
        { property: "og:url", content: siteConfig.canonicalUrl },
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
    url: siteConfig.canonicalUrl
  },

  pwa,

});
