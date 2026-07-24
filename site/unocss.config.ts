import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";
import { i18n } from "./configs/i18n";

export default defineConfig({
  shortcuts: [
    ["flex-center", "flex items-center justify-center"],
    ["hstack", "flex items-center"],
    ["text-c", "text-gray-600 dark:text-[#cccccc]"],
    ["text-light-c", "text-gray-500 dark:text-[#a0a0a0]"],
    ["text-lighter-c", "text-gray-400 dark:text-[#858585]"],
    ["text-dark-c", "text-black dark:text-[#f0f0f0]"],
    ["text-brand", "text-blue-500 dark:text-[#4daafc]"],
    ["bg-c", "bg-white dark:bg-[#252526]"],
    ["bg-dark-c", "bg-gray-100 dark:bg-[#1e1e1e]"],
    ["bg-darker-c", "bg-gray-200 dark:bg-[#2d2d30]"],
    ["bg-brand", "bg-blue-500 dark:bg-[#007acc]"],
    ["border-c", "border-gray-300 dark:border-[#3f3f46]"],
    ["border-dark-c", "border-gray-500 dark:border-[#555555]"],
    ["border-darker-c", "border-black dark:border-[#6b6b6b]"],
    ["border-light-c", "border-gray-200 dark:border-[#333337]"],
    ["hide-on-mobile", "lt-md:hidden"],
    ["shadow-c", "shadow shadow-slate-300 dark:shadow-black/50"],
    [
      "dropdown-container",
      "bg-c border border-c rounded shadow-c overflow-x-hidden overflow-y-scroll"
    ],
    ["dropdown-li", "hstack px-3 h-8 truncate cursor-pointer hover:bg-dark-c"],
    ["circle", "rounded-full flex-center"],
    ["round-btn", "circle size-7 md:size-8 hover:bg-darker-c"],
    ["rect-btn", "hstack space-x-1.5 px-2.5 py-1.5 rounded"],
    [
      "resume-card",
      "cursor-pointer mx-auto overflow-hidden rounded-md duration-150 hover:(-translate-y-3 drop-shadow-xl)"
    ]
  ],
  theme: {
    breakpoints: {
      sm: "641px",
      md: "769px",
      lg: "1025px"
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: "inline-block"
      }
    }),
    presetWebFonts({
      fonts: {
        ui: "Lato:400,700"
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  // @ts-expect-error icon is a customized key
  safelist: i18n.locales.map((item) => item.icon)
});
