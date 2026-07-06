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

<style scoped>
a.router-link-active {
  background-color: rgb(229 231 235); /* gray-200 */
  font-weight: 600;
}

:global(.dark) a.router-link-active {
  background-color: rgb(55 65 81); /* gray-700 */
}
</style>
