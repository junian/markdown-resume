<template>
  <nuxt-link class="hstack cursor-pointer space-x-1 p-1.5 rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-700" :to="link">
    <span v-if="icon" :class="icon" md:text-lg />
    <span class="truncate max-w-xs hide-on-mobile">
      {{ label }}
    </span>
  </nuxt-link>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
  link: string;
  icon?: string;
}>();
</script>
