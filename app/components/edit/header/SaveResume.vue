<template>
  <button
    class="round-btn flex-shrink-0"
    :aria-label="$t('resumes.save')"
    :title="$t('resumes.save')"
    @click="save"
  >
    <UIcon
      name="i-ic:baseline-save"
      class="md:text-lg"
    />
  </button>
</template>

<script lang="ts" setup>
import { useShortcuts } from '~/libs/vue-shortcuts'

const save = () => saveCurrentResume()

useShortcuts('ctrl+s', save)
</script>
