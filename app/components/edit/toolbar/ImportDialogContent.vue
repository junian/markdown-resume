<template>
  <div class="flex-1 px-4 py-6 space-y-6 bg-dark-c text-sm">
    <div class="w-full space-y-2">
      <UFileUpload
        v-model="selectedFile"
        accept=".md,.markdown,.mdown,.mkd,.doc,.docx,.odt,.pdf,.ppt,.pptx,.rtf,.epub,.xlsx,.ods,.odp,.csv"
        :preview="false"
        class="w-full"
        :label="$t('import.from_local')"
        @change="onFilesSelected"
      />

      <div
        v-if="localFile || converting"
        class="bg-darker-c rounded py-2 px-2 space-y-2"
      >
        <div class="truncate">
          {{ localFile }}
        </div>
        <div
          v-if="converting"
          class="space-y-1.5"
        >
          <UProgress
            :model-value="null"
            size="sm"
            animation="carousel"
          />
          <p class="text-xs text-center text-light-c">
            {{ $t('import.converting') }}
          </p>
        </div>
      </div>
    </div>

    <div class="hstack">
      <div class="flex-1 border-t border-c" />
      <div class="px-5">
        OR
      </div>
      <div class="flex-1 border-t border-c" />
    </div>

    <div class="hstack w-full space-x-1.5">
      <UInput
        class="flex-1"
        :model-value="pastedURL"
        :placeholder="$t('import.from_url')"
        @update:model-value="pastedURL = $event"
        @keydown.enter="uploadFileFromURL"
      />
      <UButton
        size="xs"
        class="flex-center w-8 h-7 rounded-sm text-white"
        icon="i-line-md:confirm"
        :aria-label="$t('import.from_url_confirm')"
        :title="$t('import.from_url_confirm')"
        @click="uploadFileFromURL"
      />
    </div>

    <UModal
      v-model:open="errorOpen"
      :ui="{
        content: ['bg-c text-c shadow-c border border-gray-400 dark:border-neutral-700 rounded-md', 'w-96 max-w-[calc(100vw-2rem)]'],
      }"
    >
      <template #content="{ close: closeError }">
        <div class="hstack justify-between pl-4 pr-3 py-2.5">
          <div class="hstack text-sm">
            <UIcon name="i-mdi:alert-circle-outline" />
            <span class="mx-2 text-light-c">/</span>
            <span>{{ $t('import.error_title') }}</span>
          </div>
          <UButton
            type="button"
            variant="ghost"
            color="neutral"
            class="circle p-1 duration-100 hover:bg-dark-c hover:rotate-90"
            :ui="{ leadingIcon: 'size-3.5' }"
            icon="i-ic:baseline-close"
            :aria-label="$t('dialog.close')"
            :title="$t('dialog.close')"
            @click="closeError()"
          />
        </div>
        <div class="px-4 pb-4">
          <p class="text-sm text-light-c break-words">
            {{ error }}
          </p>
          <UButton
            size="xs"
            class="mt-3 ml-auto text-white"
            @click="closeError()"
          >
            {{ $t('import.error_close') }}
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { fetchFile } from '~/libs/utils'

const props = defineProps<{
  close?: () => void
}>()

// File component component
const localFile = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const converting = ref(false)
const error = ref<string | null>(null)

const errorOpen = computed({
  get: () => error.value !== null,
  set: (open) => {
    if (!open) error.value = null
  },
})

const toast = useAppToast()

const showError = (err: unknown) => {
  error.value = err instanceof Error ? err.message : String(err)
}

const finishImport = (filename: string) => {
  toast.importLoaded(filename)
  props.close?.()
}

const filenameFromURL = (url: string) => {
  try {
    const name = new URL(url).pathname.split('/').filter(Boolean).pop()
    return name ? decodeURIComponent(name) : url
  }
  catch {
    return url
  }
}

const isMarkdownFile = (file: File) =>
  /\.(md|markdown|mdown|mkd)$/i.test(file.name) || file.type === 'text/markdown'

const readFileAsText = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })

let converterWorker: Worker | null = null

const getConverterWorker = () => {
  if (!converterWorker) {
    converterWorker = new Worker(
      new URL('~/libs/anydoc/converter.worker.ts', import.meta.url),
      { type: 'module' },
    )
  }
  return converterWorker
}

const convertFileToMarkdown = async (file: File) => {
  const worker = getConverterWorker()
  const bytes = await file.arrayBuffer()

  return new Promise<string>((resolve, reject) => {
    const cleanup = () => {
      worker.removeEventListener('message', onMessage)
      worker.removeEventListener('error', onError)
    }
    const onMessage = (event: MessageEvent) => {
      cleanup()
      const { ok, markdown, error } = event.data ?? {}
      if (ok) {
        resolve(markdown as string)
      }
      else {
        reject(new Error(error ?? 'Conversion failed'))
      }
    }
    const onError = (event: ErrorEvent) => {
      cleanup()
      reject(new Error(event.message || 'Worker failed'))
    }

    worker.addEventListener('message', onMessage)
    worker.addEventListener('error', onError)
    worker.postMessage(bytes, [bytes])
  })
}

onUnmounted(() => converterWorker?.terminate())

const onFilesSelected = async () => {
  const file = selectedFile.value
  if (!file) return

  localFile.value = file.name
  pastedURL.value = ''
  selectedFile.value = null

  try {
    let content: string

    if (isMarkdownFile(file)) {
      content = await readFileAsText(file)
    }
    else {
      converting.value = true
      await nextTick()
      try {
        content = await convertFileToMarkdown(file)
      }
      finally {
        converting.value = false
      }
    }

    setResumeMd(content)
    finishImport(file.name)
  }
  catch (err) {
    showError(err)
  }
}

// Fetched file from pasted URL
const pastedURL = ref('')

const uploadFileFromURL = async () => {
  const url = pastedURL.value.trim()
  if (url === '') return

  try {
    const content = await fetchFile(url)
    setResumeMd(content)
    localFile.value = null
    finishImport(filenameFromURL(url))
  }
  catch (err) {
    showError(err)
  }
}
</script>
