<template>
  <button
    class="round-btn flex-shrink-0"
    :aria-label="isToolbarOpen ? $t('toolbar.close') : $t('toolbar.open')"
    :title="isToolbarOpen ? $t('toolbar.close') : $t('toolbar.open')"
    @click="$emit('toggleToolbar')"
  >
    <span v-show="isToolbarOpen" i-tabler:layout-sidebar-right-collapse md:text-lg />
    <span v-show="!isToolbarOpen" i-tabler:layout-sidebar-right-expand md:text-lg />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  isToolbarOpen: boolean;
}>();

defineEmits<{
  (e: "toggleToolbar"): void;
}>();
</script>
