export const DEFAULT_FULL_NAME_STORAGE_KEY = "default-full-name";
export const DEFAULT_PAPER_SIZE_STORAGE_KEY = "default-paper-size";

export const DEFAULT_FULL_NAME = ""; // Now empty by default
export const DEFAULT_PAPER_SIZE = "A4";

export const getDefaultFullName = (): string => {
  return localStorage.getItem(DEFAULT_FULL_NAME_STORAGE_KEY) || "";
};

export const setDefaultFullName = (name: string): void => {
  localStorage.setItem(DEFAULT_FULL_NAME_STORAGE_KEY, name);
};

export const getDefaultPaperSize = (): string => {
  return localStorage.getItem(DEFAULT_PAPER_SIZE_STORAGE_KEY) || DEFAULT_PAPER_SIZE;
};

export const setDefaultPaperSize = (size: string): void => {
  localStorage.setItem(DEFAULT_PAPER_SIZE_STORAGE_KEY, size);
};
