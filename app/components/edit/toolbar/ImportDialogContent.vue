<template>
  <div class="flex-1 px-4 py-6 space-y-6 bg-dark-c text-sm">
    <div class="w-full space-y-2">
      <UFileUpload
        v-model="selectedFile"
        accept=".md"
        :preview="false"
        class="w-full"
        :label="$t('import.from_local')"
        @change="onFilesSelected"
      />

      <div
        v-if="localFile"
        class="bg-darker-c rounded py-1 px-2"
      >
        {{ localFile }}
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
  </div>
</template>

<script lang="ts" setup>
import { fetchFile } from '~/libs/utils'

// File component component
const localFile = ref<string | null>(null)
const selectedFile = ref<File | null>(null)

const onFilesSelected = async () => {
  const file = selectedFile.value
  if (!file) return

  const reader = new FileReader()

  reader.onloadend = () => {
    const content = reader.result as string
    setResumeMd(content)
  }
  reader.readAsText(file)

  localFile.value = file.name
  pastedURL.value = ''

  selectedFile.value = null
}

// Fetched file from pasted URL
const pastedURL = ref('')

const uploadFileFromURL = () => {
  if (pastedURL.value.trim() === '') return
  fetchFile(pastedURL.value).then((content: string) => {
    setResumeMd(content)
    localFile.value = null
  })
}
</script>
