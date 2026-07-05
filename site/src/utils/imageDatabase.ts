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
