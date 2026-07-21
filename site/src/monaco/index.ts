import type * as Monaco from "monaco-editor";
import { debounce } from "ts-debounce";

// Avoid vite-ssg error
// https://github.com/vitejs/vite/discussions/1791#discussioncomment-321046
// https://github.com/antfu/vite-ssg/issues/74
// https://github.com/YunYouJun/web-resume/blob/main/src/monaco/setup.ts

export const setupMonaco = async () => {
  if (window.monaco) {
    return {
      monaco: window.monaco
    };
  }

  const monaco = await import("monaco-editor");
  window.monaco = monaco;

  await (async () => {
    const [{ default: EditorWorker }, { default: CssWorker }] = await Promise.all([
      import("monaco-editor/esm/vs/editor/editor.worker?worker"),
      import("monaco-editor/esm/vs/language/css/css.worker?worker")
    ]);

    window.MonacoEnvironment = {
      getWorker(_moduleId: string, label: string) {
        switch (label) {
          case "editorWorkerService":
            return new EditorWorker();
          case "css":
            return new CssWorker();
          default:
            throw new Error(`Unknown label ${label}`);
        }
      }
    };
  })();

  if (getCurrentInstance()) await new Promise<void>((resolve) => onMounted(resolve));

  return { monaco };
};

export const setupMonacoModel = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  monaco: any,
  editor: Monaco.editor.IStandaloneCodeEditor,
  language: "markdown" | "css",
  content: string,
  onChange: () => void
) => {
  const disposables = [] as Monaco.IDisposable[];
  const model = monaco.editor.createModel(content, language) as Monaco.editor.ITextModel;

  disposables.push(model);
  disposables.push(model.onDidChangeContent(onChange));

  return {
    getModel: () => model,
    activate: () => {
      editor.setModel(model);
    },
    dispose: () => {
      disposables.forEach((disposable) => disposable.dispose());
    }
  };
};

export const setupMonacoEditor = async (container: HTMLDivElement) => {
  const disposables = [] as Monaco.IDisposable[];
  const { data, setData } = useDataStore();
  const { monaco } = await setupMonaco();

  // Editor
  const editor = monaco.editor.create(container, {
    wordWrap: "on",
    fontSize: 13,
    fontFamily: `Menlo, Monaco, "Courier New", monospace`,
    lineHeight: 1.5,
    automaticLayout: true,
    minimap: { enabled: getEditorMinimapEnabled() }
  }) as Monaco.editor.IStandaloneCodeEditor;

  disposables.push(editor);

  const updateMinimap = (event: Event) => {
    editor.updateOptions({
      minimap: { enabled: (event as CustomEvent<boolean>).detail }
    });
  };
  window.addEventListener(EDITOR_MINIMAP_CHANGE_EVENT, updateMinimap);
  disposables.push({
    dispose: () => window.removeEventListener(EDITOR_MINIMAP_CHANGE_EVENT, updateMinimap)
  });

  // Theme
  monaco.editor.defineTheme("vs-dark-dimmed", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#1e1e1e",
      "editor.lineHighlightBorder": "#2a2d2e",
      "dropdown.background": "#252526",
      "menu.separatorBackground": "#454545"
    }
  });

  const colorMode = useColorMode();

  monaco.editor.setTheme(colorMode.value === "dark" ? "vs-dark-dimmed" : "vs");

  watch(
    () => colorMode.value,
    (val) => {
      monaco.editor.setTheme(val === "dark" ? "vs-dark-dimmed" : "vs");
    }
  );

  // Markdown model
  const markdown = setupMonacoModel(
    monaco,
    editor,
    "markdown",
    data.mdContent,
    debounce(() => {
      setData("mdContent", markdown.getModel().getValue());
    }, 200)
  );
  disposables.push(markdown);

  // CSS model
  const css = setupMonacoModel(
    monaco,
    editor,
    "css",
    data.cssContent,
    debounce(() => {
      setData("cssContent", css.getModel().getValue());
    }, 200)
  );
  disposables.push(css);

  // Preserve Enter's normal editor behavior, then save the updated models once
  // Monaco has applied the newline.
  let saveAfterEnter = false;
  disposables.push(
    editor.onKeyDown((event) => {
      if (event.keyCode !== monaco.KeyCode.Enter) return;

      saveAfterEnter = true;
      window.setTimeout(() => {
        saveAfterEnter = false;
      });
    })
  );
  disposables.push(
    editor.onDidChangeModelContent(() => {
      if (!saveAfterEnter) return;

      saveAfterEnter = false;
      setData("mdContent", markdown.getModel().getValue());
      setData("cssContent", css.getModel().getValue());
      void saveCurrentResume(false);
    })
  );

  return {
    editor,
    models: {
      markdown,
      css
    },
    dispose: () => {
      disposables.forEach((disposable) => disposable.dispose());
    }
  };
};
