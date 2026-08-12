<template>
  <button
    class="round-btn flex-shrink-0"
    :aria-label="isToolbarOpen ? $t('toolbar.close') : $t('toolbar.open')"
    :title="isToolbarOpen ? $t('toolbar.close') : $t('toolbar.open')"
    @click="$emit('toggleToolbar')"
  >
    <UIcon
      v-show="isToolbarOpen"
      name="i-tabler:layout-sidebar-right-collapse"
      class="md:text-lg"
    />
    <UIcon
      v-show="!isToolbarOpen"
      name="i-tabler:layout-sidebar-right-expand"
      class="md:text-lg"
    />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  isToolbarOpen: boolean
}>()

defineEmits<{
  (e: 'toggleToolbar'): void
}>()
</script>
