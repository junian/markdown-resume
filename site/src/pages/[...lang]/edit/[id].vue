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

      <button
        v-if="!isToolbarOpen"
        class="tools-pane-open shadow-c"
        type="button"
        :aria-label="$t('toolbar.open')"
        @click="isToolbarOpen = true"
      >
        <span i-tabler:layout-sidebar-right-expand text-xl />
      </button>

      <div v-if="isToolbarOpen" class="tools-pane">
        <div class="tools-pane-header">
          <span i-ep:document flex-shrink-0 text-lg />
          <RenameResume />
          <SaveResume />
          <ToggleToolbar
            :is-toolbar-open="isToolbarOpen"
            @toggle-toolbar="isToolbarOpen = !isToolbarOpen"
          />
        </div>
        <div class="min-h-0 flex-1">
          <Toolbar />
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

.tools-pane-open {
  @apply fixed z-20 right-3 top-3 circle size-10 bg-c text-c hover:bg-darker-c;
}
</style>
