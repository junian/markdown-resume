<template>
  <div class="w-52 h-52">
    <UFileUpload
      v-model="selectedFile"
      icon="i-lucide-image"
      color="neutral"
      highlight
      :label="$t('images.from_local')"
      description="SVG, PNG, JPG"
      accept="image/*"
      :preview="false"
      class="size-full duration-150 hover:-translate-y-2 hover:drop-shadow-xl"
      :ui="{
        base: 'hover:bg-default',
        avatar: 'size-10',
      }"
      @change="onFilesSelected"
    />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'uploaded'): void
}>()

const toast = useAppToast()

const selectedFile = ref<File | null>(null)

const onFilesSelected = async () => {
  const file = selectedFile.value
  if (!file) return

  await saveImage(file.name, file, file.type, file.size)
  toast.uploadImage(file.name)

  selectedFile.value = null
  emit('uploaded')
}
</script>
