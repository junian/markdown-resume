import type { ResumeStyles } from "~/types";
import defaultResumeCSS from "~/assets/default-resume.css.txt?raw";
import defaultResumeMarkdown from "~/assets/default-resume.md?raw";
import { SYSTEM_CJK_FONT_FAMILY } from "./data";

export const DEFAULT_NAME = "My Resume";

export const DEFAULT_STYLES = {
  marginV: 55,
  marginH: 45,
  lineHeight: 1.3,
  paragraphSpace: 5,
  themeColor: "#000000",
  fontCJK: {
    name: "System CJK",
    fontFamily: SYSTEM_CJK_FONT_FAMILY
  },
  fontEN: {
    name: "Verdana"
  },
  fontSize: 12,
  paper: "A4"
} as ResumeStyles;

export const DEFAULT_MD_CONTENT = defaultResumeMarkdown;

export const PREVIEW_SELECTOR = "#vue-smart-pages-preview";

export const DEFAULT_CSS_CONTENT = defaultResumeCSS.replaceAll("#PREVIEW_SELECTOR", PREVIEW_SELECTOR);
