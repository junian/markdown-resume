<template>
  <div class="edit-page sidebar-layout flex flex-col">
    <MainSidebar default-collapsed />

    <div
      class="workspace size-full overflow-hidden flex flex-1 pb-2"
    >
      <div
        v-if="!isSplitterReady"
        class="min-w-0 flex-1"
      />
      <SplitterGroup
        v-else
        id="editor-preview"
        class="px-3"
        :direction="isStackedLayout ? 'vertical' : 'horizontal'"
      >
        <SplitterPanel
          id="editor"
          class="editor-pane"
        >
          <Editor />
        </SplitterPanel>

        <SplitterResizeHandle id="editor-preview-resize" />

        <SplitterPanel
          id="preview"
          class="preview-pane"
        >
          <Preview />
        </SplitterPanel>
      </SplitterGroup>

      <div
        class="tools-pane"
        :class="{ 'tools-pane--collapsed': !isToolbarOpen }"
      >
        <div
          v-if="isToolbarOpen"
          class="tools-pane-header"
        >
          <UIcon
            name="i-ep:document"
            class="flex-shrink-0 text-lg"
          />
          <RenameResume />
          <SaveResume />
          <ToggleToolbar
            :is-toolbar-open="isToolbarOpen"
            @toggle-toolbar="isToolbarOpen = !isToolbarOpen"
          />
        </div>
        <div class="min-h-0 flex-1">
          <Toolbar v-if="isToolbarOpen" />
          <div
            v-else
            class="collapsed-tools"
          >
            <ToggleToolbar
              :is-toolbar-open="isToolbarOpen"
              @toggle-toolbar="isToolbarOpen = true"
            />
            <SaveResume />
            <UButton
              v-for="action in exportActions"
              :key="action.label"
              variant="ghost"
              class="round-btn"
              :icon="action.icon"
              :aria-label="action.label"
              :title="action.label"
              @click="action.run"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui'

const isStackedLayout = ref(false)
const isSplitterReady = ref(false)
let layoutMediaQuery: MediaQueryList | undefined
const updateLayout = () => {
  if (layoutMediaQuery) isStackedLayout.value = layoutMediaQuery.matches
}

// Fetch resume data
const route = useRoute();
(async () => await switchResume(route.params.id as string))()

// Toogle toolbar
const isToolbarOpen = ref(false)

onMounted(async () => {
  layoutMediaQuery = window.matchMedia('(max-width: 768px)')
  updateLayout()
  layoutMediaQuery.addEventListener('change', updateLayout)
  isToolbarOpen.value = !isStackedLayout.value
  await nextTick()
  isSplitterReady.value = true
})

onBeforeUnmount(() => {
  layoutMediaQuery?.removeEventListener('change', updateLayout)
})

const { exportPDF, exportMd, exportHtml, exportDocx } = useResumeExport()
const { t } = useI18n()
const exportActions = computed(() => [
  { label: t('toolbar.file.export_pdf'), icon: 'i-mdi:file-pdf', run: exportPDF },
  { label: t('toolbar.file.export_md'), icon: 'i-ri:markdown-fill', run: exportMd },
  { label: t('toolbar.file.export_html'), icon: 'i-mdi:language-html5', run: exportHtml },
  { label: t('toolbar.file.export_docx'), icon: 'i-mdi:file-word', run: exportDocx },
])
</script>
