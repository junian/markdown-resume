/**
 * Service Worker for serving images stored in IndexedDB.
 *
 * Intercepts GET requests matching /markdown-resume/images/<id> and
 * responds with the corresponding Blob retrieved from IndexedDB via
 * the localForage store key "MARKDOWN_RESUME_images".
 *
 * This gives each uploaded image a stable, persistent URL that survives
 * page refreshes and can be used directly in Markdown / HTML.
 */

const IMAGE_GALLERY_KEY = "MARKDOWN_RESUME_images";
const IMAGE_URL_PREFIX = "/markdown-resume/images/";

// ── IndexedDB helpers (no localForage in SW — raw IDB) ─────────────────────

function openDb() {
  return new Promise((resolve, reject) => {
    // localForage defaults: db = "localforage", store = "keyvaluepairs"
    const req = indexedDB.open("localforage", 2);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("keyvaluepairs")) {
        db.createObjectStore("keyvaluepairs");
      }
    };
  });
}

async function getImageFromDb(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("keyvaluepairs", "readonly");
    const store = tx.objectStore("keyvaluepairs");
    const req = store.get(IMAGE_GALLERY_KEY);
    req.onsuccess = () => {
      const storage = req.result;
      resolve(storage && storage[id] ? storage[id] : null);
    };
    req.onerror = () => reject(req.error);
  });
}

// ── Fetch handler ───────────────────────────────────────────────────────────

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (
    event.request.method !== "GET" ||
    !url.pathname.startsWith(IMAGE_URL_PREFIX)
  ) {
    return; // let everything else pass through
  }

  const id = url.pathname.slice(IMAGE_URL_PREFIX.length);
  if (!id) return;

  event.respondWith(
    getImageFromDb(id).then((item) => {
      if (!item) {
        return new Response("Image not found", { status: 404 });
      }
      return new Response(item.blob, {
        status: 200,
        headers: {
          "Content-Type": item.mimeType || "image/png",
          "Cache-Control": "no-store"
        }
      });
    }).catch(() => new Response("Error reading image", { status: 500 }))
  );
});
