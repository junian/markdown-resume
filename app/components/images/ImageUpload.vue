<template>
  <UFileUpload
    v-model="selectedFile"
    icon="i-lucide-image"
    :label="$t('images.from_local')"
    description="SVG, PNG, JPG"
    accept="image/*"
    :preview="false"
    class="w-full"
    @change="onFilesSelected"
  />
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
