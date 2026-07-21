<template>
  <div class="edit-page flex flex-col">
    <Header default-collapsed />

    <div class="workspace size-full overflow-hidden" flex="~ 1" pb-2>
      <div v-bind="api.rootProps" px-3>
        <div class="editor-pane" v-bind="api.getPanelProps({ id: 'editor' })">
          <Editor />
        </div>

        <div v-bind="api.getResizeTriggerProps({ id: 'editor:preview' })" />

        <div class="preview-pane" v-bind="api.getPanelProps({ id: 'preview' })">
          <Preview />
        </div>
      </div>

      <div class="tools-pane" :class="{ 'tools-pane--collapsed': !isToolbarOpen }">
        <div v-if="isToolbarOpen" class="tools-pane-header">
          <span i-ep:document flex-shrink-0 text-lg />
          <RenameResume />
          <SaveResume />
          <ToggleToolbar
            :is-toolbar-open="isToolbarOpen"
            @toggle-toolbar="isToolbarOpen = !isToolbarOpen"
          />
        </div>
        <div class="min-h-0 flex-1">
          <Toolbar v-if="isToolbarOpen" />
          <div v-else class="collapsed-tools">
            <ToggleToolbar
              :is-toolbar-open="isToolbarOpen"
              @toggle-toolbar="isToolbarOpen = true"
            />
            <SaveResume />
            <button
              v-for="action in exportActions"
              :key="action.label"
              class="round-btn"
              :aria-label="action.label"
              :title="action.label"
              @click="action.run"
            >
              <span :class="action.icon" text-lg />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as splitter from "@zag-js/splitter";
import { normalizeProps, useMachine } from "@zag-js/vue";

// Horizontal splitpane
const [state, send] = useMachine(
  splitter.machine({
    id: "h",
    size: [{ id: "editor" }, { id: "preview" }]
  })
);

const api = computed(() => splitter.connect(state.value, send, normalizeProps));

// Fetch resume data
const route = useRoute();
(async () => await switchResume(route.params.id as string))();

// Toogle toolbar
const { width } = useWindowSize();
const isToolbarOpen = ref(width.value > 1024);

const { exportPDF, exportMd, exportHtml, exportDocx } = useResumeExport();
const { t } = useI18n();
const exportActions = computed(() => [
  { label: t("toolbar.file.export_pdf"), icon: "i-mdi:file-pdf", run: exportPDF },
  { label: t("toolbar.file.export_md"), icon: "i-ri:markdown-fill", run: exportMd },
  { label: t("toolbar.file.export_html"), icon: "i-mdi:language-html5", run: exportHtml },
  { label: t("toolbar.file.export_docx"), icon: "i-mdi:file-word", run: exportDocx }
]);
</script>

<style scoped>
[data-scope="splitter"][data-part="resize-trigger"] {
  @apply relative w-3 outline-none;
}

[data-scope="splitter"][data-part="resize-trigger"]::after {
  @apply content-[""] absolute bg-gray-400/40 w-1 h-10 rounded-full inset-0 m-auto;
}

.tools-pane-header {
  @apply hstack flex-none gap-1 min-h-12 px-2 bg-c border-b border-c text-c;
}

.collapsed-tools {
  @apply flex flex-col items-center gap-2 py-2;
}
</style>
