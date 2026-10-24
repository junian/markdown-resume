<template>
  <div class="file-options hstack space-x-2">
    <UButton
      variant="outline"
      color="neutral"
      icon="i-ic:baseline-save-as"
      :aria-label="$t('resumes.saveas')"
      @click="saveResumesToLocal"
    >
      {{ $t("resumes.saveas") }}
    </UButton>
    <UButton
      variant="outline"
      color="neutral"
      icon="i-ic:round-upload-file"
      :aria-label="$t('resumes.import')"
      @click="() => importResumesFromLocal(() => $emit('update'))"
    >
      {{ $t("resumes.import") }}
    </UButton>
  </div>
</template>

<script lang="ts" setup>
import { useShortcuts } from '~/libs/vue-shortcuts'

defineEmits<{
  (e: 'update'): void
}>()

useShortcuts('shift+ctrl+s', saveResumesToLocal)
</script>
