<template>
  <div class="image-item group">
    <!-- Card thumbnail -->
    <div
      class="relative w-52 h-52 overflow-hidden rounded-md border border-c cursor-pointer duration-150 hover:-translate-y-2 hover:drop-shadow-xl"
    >
      <img
        :src="imageUrl"
        :alt="image.name"
        class="w-full h-full object-cover"
      >

      <!-- Hover action buttons -->
      <div class="absolute right-2 top-2 hidden group-hover:flex flex-col gap-2">
        <UButton
          type="button"
          variant="ghost"
          class="action-btn text-white hover:bg-gray-500"
          icon="i-ic:baseline-content-copy"
          :title="$t('images.copy_url')"
          :aria-label="$t('images.copy_url')"
          @click.stop="copyUrl"
        />
        <UButton
          type="button"
          variant="ghost"
          class="action-btn text-white hover:bg-gray-500"
          icon="i-material-symbols:delete-outline-rounded"
          :title="$t('images.delete')"
          :aria-label="$t('images.delete')"
          @click.stop="remove"
        />
      </div>
    </div>

    <!-- Image name + date -->
    <div class="mt-2 w-52 space-y-0.5">
      <p
        class="text-sm text-dark-c truncate"
        :title="image.name"
      >
        {{ image.name }}
      </p>
      <p class="text-xs text-lighter-c">
        {{ formattedDate }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ImageListItem } from '~/types'

const props = defineProps<{
  image: ImageListItem
}>()

const emit = defineEmits<{
  (e: 'update'): void
}>()

const toast = useAppToast()

// Stable URL served by the image Service Worker
const imageUrl = computed(() => getImageUrl(props.image.id))

const formattedDate = computed(() =>
  new Date(props.image.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
)

const copyUrl = async () => {
  const markdown = `![${props.image.name}](${imageUrl.value})`
  await navigator.clipboard.writeText(markdown)
  toast.copyImageUrl()
}

const remove = async () => {
  await deleteImage(props.image.id)
  toast.deleteImage(props.image.name)
  emit('update')
}
</script>
