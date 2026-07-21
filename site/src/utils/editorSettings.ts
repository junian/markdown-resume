export const EDITOR_MINIMAP_STORAGE_KEY = "editor-minimap-enabled";
export const EDITOR_MINIMAP_CHANGE_EVENT = "editor-minimap-change";

export const getEditorMinimapEnabled = () =>
  localStorage.getItem(EDITOR_MINIMAP_STORAGE_KEY) !== "false";

export const setEditorMinimapEnabled = (enabled: boolean) => {
  localStorage.setItem(EDITOR_MINIMAP_STORAGE_KEY, String(enabled));
  window.dispatchEvent(new CustomEvent(EDITOR_MINIMAP_CHANGE_EVENT, { detail: enabled }));
};
