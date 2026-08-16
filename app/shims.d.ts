/* eslint-disable */

import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare global {
  interface Window {
    // extend the window
    monaco: typeof import("monaco-editor") | undefined;
    MonacoEnvironment: import("monaco-editor").Environment;
  }
}

declare module "*.vue" {
  import { type DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@vue/runtime-dom" {
  interface HTMLAttributes extends AttributifyAttributes {}
}

declare module "vue" {
  interface ComponentCustomProps {
    // Allow HTML attributes to fall through to a component's root element
    // without being declared as a prop.
    id?: string
    "aria-label"?: string
    title?: string
  }
}
