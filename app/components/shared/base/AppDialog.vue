<template>
  <UModal
    :ui="{
      content: ['font-ui flex-col bg-c text-c shadow-c border border-gray-400 dark:border-neutral-700 rounded-md', boxClass],
    }"
  >
    <slot name="button" />

    <template #content="{ close }">
      <div class="hstack justify-between pl-4 pr-3 py-2.5">
        <div class="hstack text-sm">
          <UIcon :name="icon" />
          <span class="mx-2 text-light-c">/</span>
          <span>{{ title }}</span>
        </div>

        <button
          class="circle p-1 duration-100 hover:bg-dark-c hover:rotate-90"
          type="button"
          @click="close()"
        >
          <UIcon name="i-ic:baseline-close" />
        </button>
      </div>

      <slot name="content" />
    </template>
  </UModal>
</template>

<script lang="ts" setup>
defineProps<{
  id: string
  title: string
  icon: string
  boxClass?: string
}>()
</script>
