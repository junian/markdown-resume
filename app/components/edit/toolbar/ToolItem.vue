<template>
  <div
    class="tool-item mx-4 mt-5 pb-6 text-xs md:text-sm"
  >
    <div class="hstack space-x-2 mb-4 text-sm md:text-base">
      <span
        v-if="icon"
        :class="icon"
      />
      <span>{{ text }}</span>
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  text: string
  icon?: string
}>()
</script>
