<template>
  <UButton
    variant="ghost"
    class="flex-shrink-0 flex items-center justify-center rounded-full size-7 md:size-8 hover:bg-gray-200 dark:hover:bg-[#2d2d30] text-gray-600 dark:text-[#cccccc]"
    :aria-label="$t('resumes.save')"
    :title="$t('resumes.save')"
    icon="i-ic:baseline-save"
    @click="save"
  />
</template>

<script lang="ts" setup>
import { useShortcuts } from '~/libs/vue-shortcuts'

const save = () => saveCurrentResume()

useShortcuts('ctrl+s', save)
</script>
