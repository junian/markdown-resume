/**
 * Registers the image Service Worker that serves stored images via
 * stable persistent URLs (/markdown-resume/images/<id>).
 *
 * The `.client` suffix ensures this only runs in the browser.
 */
export default defineNuxtPlugin(() => {
  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker
    .register("/markdown-resume/sw-images.js", { scope: "/markdown-resume/" })
    .catch((err) => {
      console.warn("[image-sw] Service Worker registration failed:", err);
    });
});
