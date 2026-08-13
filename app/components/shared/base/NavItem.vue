<template>
  <nuxt-link
    class="hstack cursor-pointer p-1.5 rounded transition-colors hover:bg-gray-200 dark:hover:bg-[#2a2d2e]"
    :to="link"
    :title="label"
  >
    <UIcon
      v-if="icon"
      :name="icon"
      class="text-lg"
    />
    <span class="sidebar-label truncate max-w-xs">
      {{ label }}
    </span>
  </nuxt-link>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
  link: string
  icon?: string
}>()
</script>
