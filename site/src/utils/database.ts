import * as localForage from "localforage";
import { downloadFile, uploadFile, copy, isClient } from "@renovamen/utils";
import { DEFAULT_STYLES, DEFAULT_NAME, DEFAULT_MD_CONTENT, DEFAULT_CSS_CONTENT } from ".";
import {
  getDefaultFullName,
  getDefaultPaperSize,
  DEFAULT_FULL_NAME,
} from "./defaultSettings";
import type { ResumeStorage, ResumeStorageItem, ResumeStyles } from "~/types";

const MARKDOWN_RESUME_KEY = "MARKDOWN_RESUME_data";

export const clearResumeStorage = () => localForage.removeItem(MARKDOWN_RESUME_KEY);

export const getStorage = async () =>
  isClient ? localForage.getItem<ResumeStorage>(MARKDOWN_RESUME_KEY) : null;

export const getResumeList = async () => {
  const storage = (await getStorage()) || {};
  return Object.keys(storage)
    .map((i) => ({
      id: i,
      ...storage[i]
    }))
    .sort((a, b) => (b.update || b.id).localeCompare(a.update || a.id));
};

export const setResumeStyles = (styles: ResumeStyles) => {
  const { setStyle } = useStyleStore();

  for (const key of Object.keys(styles) as Array<keyof ResumeStyles>)
    setStyle(key, styles[key]);
};

export const setResumeMd = (content: string) => {
  const { setData, toggleMdFlag } = useDataStore();

  setData("mdContent", content);
  toggleMdFlag(true);
};

export const setResumeCss = (content: string) => {
  const { setData, toggleCssFlag } = useDataStore();

  setData("cssContent", content);
  toggleCssFlag(true);
};

/**
 * Overwrite data for a given resume to local storage
 *
 * @param id resume id
 * @param resume resume data
 */
export const setResume = (id: string, resume: ResumeStorageItem) => {
  const { setData } = useDataStore();

  setData("curResumeId", id);
  setData("curResumeName", resume.name);
  setResumeMd(resume.markdown);
  setResumeCss(resume.css);
  setResumeStyles(resume.styles);
};

/**
 * Save changes to a certain resume
 *
 * @param id resume id
 * @param resume resume data
 */
export const saveResume = async (
  id: string,
  resume: ResumeStorageItem,
  showToast = true
) => {
  const storage = (await getStorage()) || {};
  storage[id] = resume;

  await localForage.setItem(MARKDOWN_RESUME_KEY, storage);

  if (showToast) {
    const toast = useToast();
    toast.save();
  }
};

export const saveCurrentResume = (showToast = true) => {
  const { data } = useDataStore();
  const { styles } = useStyleStore();

  if (!data.curResumeId) return;

  return saveResume(
    data.curResumeId,
    {
      name: data.curResumeName,
      markdown: data.mdContent,
      css: data.cssContent,
      styles: toRaw(styles),
      update: new Date().getTime().toString()
    },
    showToast
  );
};

/**
 * New a resume using default styles and content
 */
export const newResume = async () => {
  const id = new Date().getTime().toString(); // generate a new id
  const defaultFullName = getDefaultFullName();
  // Determine resume name and markdown name
  const resumeName = defaultFullName.trim() 
    ? `${defaultFullName.trim()} Resume` 
    : DEFAULT_NAME;
  const markdownNameToUse = defaultFullName.trim() || "Firstname Lastname";
  // Replace the default name in markdown
  const markdown = DEFAULT_MD_CONTENT.replace("# Firstname Lastname", `# ${markdownNameToUse}`);
  const styles = { ...DEFAULT_STYLES, paper: getDefaultPaperSize() as any };

  const resume = {
    name: resumeName,
    markdown,
    css: DEFAULT_CSS_CONTENT,
    styles,
    update: id
  } as ResumeStorageItem;

  await saveResume(id, resume);

  const toast = useToast();
  toast.new();

  return id;
};

/**
 * Download data for all resumes to a .json file
 */
export const saveResumesToLocal = async () => {
  const storage = (await getStorage()) || {};
  downloadFile("MARKDOWN_RESUME_data.json", JSON.stringify(storage));
};

/**
 * Import resumes from a local .json file
 *
 * @param callback A callback function to be excuted after importing finished
 */
export const importResumesFromLocal = async (callback?: () => void) => {
  const toast = useToast();

  const check = (data: ResumeStorage) => {
    for (const resume of Object.values(data)) {
      if (typeof resume.name !== "string") return false;
      if (typeof resume.markdown !== "string") return false;
      if (typeof resume.css !== "string") return false;
      if (typeof resume.styles !== "object") return false;
      if (!["string", "undefined"].includes(typeof resume.update)) return false;

      const styles = resume.styles;

      if (typeof styles.fontSize !== "number") return false;
      if (typeof styles.lineHeight !== "number") return false;
      if (typeof styles.marginH !== "number") return false;
      if (typeof styles.marginV !== "number") return false;
      if (typeof styles.paper !== "string") return false;
      if (typeof styles.paragraphSpace !== "number") return false;
      if (typeof styles.themeColor !== "string") return false;

      if (typeof styles.fontCJK !== "object" || typeof styles.fontCJK.name !== "string")
        return false;
      if (typeof styles.fontEN !== "object" || typeof styles.fontEN.name !== "string")
        return false;
    }

    return true;
  };

  const storage = (await getStorage()) || {};

  const merge = async (content: string) => {
    const data = JSON.parse(content) as ResumeStorage;

    if (!check(data)) {
      toast.import(false);
      return;
    }

    const newStorage = {
      ...storage,
      ...data
    };

    await localForage.setItem(MARKDOWN_RESUME_KEY, newStorage);
    toast.import(true);

    callback && callback();
  };

  uploadFile(merge, ".json");
};

export const deleteResume = async (id: string) => {
  const toast = useToast();
  const storage = await getStorage();

  if (storage && storage[id]) {
    const name = storage[id].name;
    delete storage[id];

    await localForage.setItem(MARKDOWN_RESUME_KEY, storage);

    toast.delete(name);
  }
};

export const switchResume = async (id: string) => {
  const toast = useToast();
  const storage = await getStorage();

  if (storage && storage[id]) {
    setResume(id, storage[id]);
    toast.switch(storage[id].name);
    return true;
  }

  return false;
};

export const duplicateResume = async (id: string) => {
  const toast = useToast();
  const storage = await getStorage();

  if (storage && storage[id]) {
    // Generate an id and name for duplicated resume
    const resume = copy(storage[id]);
    const newId = new Date().getTime().toString();
    const originalName = resume.name;

    // Strip any existing "copy X" suffix to get the base name
    const baseName = originalName.replace(/ copy \d+$/i, "");

    // Check for existing copies of the base name
    const copyRegex = new RegExp(`^${baseName} copy (\\d+)$`, "i");
    let maxCopyNumber = 0;

    Object.values(storage).forEach((item) => {
      const match = item.name.match(copyRegex);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxCopyNumber) {
          maxCopyNumber = num;
        }
      }
    });

    const newCopyNumber = maxCopyNumber + 1;
    resume.name = `${baseName} copy ${newCopyNumber}`;
    resume.update = newId;
    storage[newId] = resume;

    await localForage.setItem(MARKDOWN_RESUME_KEY, storage);
    toast.duplicate(originalName);
  }
};

export const renameResume = async (id: string, name: string) => {
  const storage = (await getStorage()) || {};
  storage[id].name = name;

  await localForage.setItem(MARKDOWN_RESUME_KEY, storage);

  const toast = useToast();
  toast.save();
};
