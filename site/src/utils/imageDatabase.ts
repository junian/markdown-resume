import * as localForage from "localforage";
import { isClient } from "@renovamen/utils";
import type { ImageStorage, ImageStorageItem, ImageListItem } from "~/types";

const IMAGE_GALLERY_KEY = "MARKDOWN_RESUME_images";

/** Base path must match nuxt.config baseURL */
const IMAGE_URL_BASE = "/markdown-resume/images/";

/** Stable URL served by the image Service Worker */
export const getImageUrl = (id: string) => `${IMAGE_URL_BASE}${id}`;

export const getImageStorage = async () =>
  isClient ? localForage.getItem<ImageStorage>(IMAGE_GALLERY_KEY) : null;

export const getImageList = async (sortAsc = false) => {
  const storage = (await getImageStorage()) || {};
  const list = Object.keys(storage).map((id) => ({
    id,
    ...storage[id]
  }));

  return list.sort((a, b) => {
    const cmp = a.createdAt.localeCompare(b.createdAt);
    return sortAsc ? cmp : -cmp;
  });
};

/**
 * Save an image Blob to IndexedDB.
 * localForage stores Blobs natively — no base64 conversion needed.
 *
 * @param name     Original file name
 * @param blob     The raw image Blob / File
 * @param mimeType MIME type (e.g. "image/png")
 * @param size     File size in bytes
 */
export const saveImage = async (
  name: string,
  blob: Blob,
  mimeType: string,
  size: number
): Promise<ImageListItem> => {
  const storage = (await getImageStorage()) || {};

  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const item: ImageStorageItem = {
    name,
    blob,
    mimeType,
    size,
    createdAt: new Date().toISOString()
  };

  storage[id] = item;
  await localForage.setItem(IMAGE_GALLERY_KEY, storage);

  return { id, ...item };
};

/**
 * Replace all /markdown-resume/images/<id> src references in an HTML string
 * with inline base64 data URLs read from IndexedDB.
 *
 * Call this before exporting to HTML or DOCX so the output is self-contained.
 */
export const inlineImagesInHtml = async (html: string): Promise<string> => {
  const storage = (await getImageStorage()) || {};

  // Match both quoted src attributes and markdown-rendered img tags
  const pattern = /\/markdown-resume\/images\/([\w-]+)/g;

  const matches = [...new Set([...html.matchAll(pattern)].map((m) => m[1]))];
  if (matches.length === 0) return html;

  // Build id → data URL map (only for ids that exist in storage)
  const replacements: Record<string, string> = {};
  await Promise.all(
    matches.map(async (id) => {
      const item = storage[id];
      if (!item) return;
      replacements[id] = await blobToDataUrl(item.blob);
    })
  );

  return html.replace(pattern, (_, id) => replacements[id] ?? `/markdown-resume/images/${id}`);
};

const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

/**
 * Delete an image from IndexedDB by id.
 *
 * @param id image id
 * @returns the name of the deleted image, or null if not found
 */
export const deleteImage = async (id: string): Promise<string | null> => {
  const storage = await getImageStorage();

  if (storage && storage[id]) {
    const { name } = storage[id];
    delete storage[id];
    await localForage.setItem(IMAGE_GALLERY_KEY, storage);
    return name;
  }

  return null;
};
