import { siteConfig } from "./siteConfig";
import type { ModuleOptions } from "@vite-pwa/nuxt";

const scope = siteConfig.baseURL;
const escapedScope = scope.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const pwa: ModuleOptions = {
  registerType: "autoUpdate",
  devOptions: {
    enabled: true,
    // Let Nuxt handle direct navigation to development deep links. The dev
    // worker's fallback document is the Home page, so it must only handle the
    // exact application root.
    navigateFallbackAllowlist: [new RegExp(`^${escapedScope}$`)]
  },
  scope,
  base: scope,
  manifest: {
    id: scope,
    scope,
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    icons: [
      {
        src: `${siteConfig.baseURL}pwa-192x192.png`,
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: `${siteConfig.baseURL}pwa-512x512.png`,
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: `${siteConfig.baseURL}favicon.svg`,
        sizes: "512x512",
        type: "image/svg",
        purpose: "any maskable"
      }
    ]
  },
  workbox: {
    cacheId: siteConfig.cacheId,
    importScripts: ["sw-images.js"],
    // Use Nuxt's route-neutral SPA shell instead of the Home document when a
    // static host needs the service worker to resolve a deep link.
    navigateFallback: `${scope}200`,
    globPatterns: ["**/*.{js,css,html,otf,ttf,woff2,png,svg}"],
    maximumFileSizeToCacheInBytes: 16000000,
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },
  registerWebManifestInRouteRules: true,
  writePlugin: true
};
