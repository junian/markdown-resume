<template>
  <div class="pane-container flex flex-col">
    <UTabs
      v-model="activeTab"
      :items="tabList"
      :content="false"
      variant="link"
      class="flex-none"
      :ui="{
        list: 'hstack h-9 md:h-10 text-sm md:text-base w-full text-c bg-c border-b border-c px-4 space-x-2',
        trigger: 'relative leading-9 md:leading-10 px-2',
        indicator: 'h-[1.5px] bg-blue-500 dark:bg-blue-400 rounded',
      }"
    />

    <div
      ref="editorRef"
      class="min-h-0 flex-1"
    />
  </div>
</template>

<script lang="ts" setup>
import type * as Monaco from 'monaco-editor'
import { isClient } from '~/libs/utils'
import { setupMonacoEditor } from '~/libs/monaco'

const editorRef = ref<HTMLDivElement>()

let editor:
  | {
    editor: Monaco.editor.IStandaloneCodeEditor
    models: {
      [key: string]: {
        getModel: () => Monaco.editor.ITextModel
        activate: () => void
        dispose: () => void
      }
    }
    dispose: () => void
  }
  | undefined

// Setup Monaco editor
onMounted(async () => {
  if (isClient && editorRef.value && !editor) {
    editor = await setupMonacoEditor(editorRef.value)
    activate('markdown')
  }
})

onBeforeUnmount(() => editor?.dispose())

// Watch the updates of editor content on other places
const { data, toggleMdFlag, toggleCssFlag } = useDataStore()

watch(
  () => data.mdFlag,
  () => {
    if (data.mdFlag) {
      editor?.models['markdown'].getModel().setValue(data.mdContent)
      toggleMdFlag(false)
    }
  },
)

watch(
  () => data.cssFlag,
  () => {
    if (data.cssFlag) {
      editor?.models['css'].getModel().setValue(data.cssContent)
      toggleCssFlag(false)
    }
  },
)

// Change model
const activate = (value: 'markdown' | 'css') => {
  editor?.models[value].activate()
}

// Tabs UI
const tabList = [
  { value: 'markdown', label: 'Markdown' },
  { value: 'css', label: 'CSS' },
]

const activeTab = ref<'markdown' | 'css'>('markdown')

watch(activeTab, value => activate(value))
</script>
