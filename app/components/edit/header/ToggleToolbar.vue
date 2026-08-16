<template>
  <UButton
    variant="ghost"
    class="flex-shrink-0 flex items-center justify-center rounded-full size-7 md:size-8 hover:bg-gray-200 dark:hover:bg-[#2d2d30] text-gray-600 dark:text-[#cccccc]"
    :aria-label="isToolbarOpen ? $t('toolbar.close') : $t('toolbar.open')"
    :title="isToolbarOpen ? $t('toolbar.close') : $t('toolbar.open')"
    :icon="isToolbarOpen ? 'i-tabler:layout-sidebar-right-collapse' : 'i-tabler:layout-sidebar-right-expand'"
    @click="$emit('toggleToolbar')"
  />
</template>

<script lang="ts" setup>
defineProps<{
  isToolbarOpen: boolean
}>()

defineEmits<{
  (e: 'toggleToolbar'): void
}>()
</script>
