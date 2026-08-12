<template>
  <div class="file-options hstack space-x-2">
    <button
      class="rect-btn border border-dark-c hover:bg-darker-c"
      :aria-label="$t('resumes.saveas')"
      @click="saveResumesToLocal"
    >
      <UIcon
        name="i-ic:baseline-save-as"
        class="text-lg"
      />
      <span>{{ $t("resumes.saveas") }}</span>
    </button>
    <button
      class="rect-btn border border-dark-c hover:bg-darker-c"
      :aria-label="$t('resumes.import')"
      @click="() => importResumesFromLocal(() => $emit('update'))"
    >
      <UIcon
        name="i-ic:round-upload-file"
        class="text-lg"
      />
      <span>{{ $t("resumes.import") }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useShortcuts } from '~/libs/vue-shortcuts'

defineEmits<{
  (e: 'update'): void
}>()

useShortcuts('shift+ctrl+s', saveResumesToLocal)
</script>
