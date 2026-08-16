<template>
  <div class="absolute right-3 top-3 space-y-2">
    <UButton
      type="button"
      variant="ghost"
      class="action-btn text-white hover:bg-gray-500"
      icon="i-ion:duplicate"
      :title="$t('resumes.duplicate')"
      :aria-label="$t('resumes.duplicate')"
      @click="duplicate"
    />
    <UButton
      type="button"
      variant="ghost"
      class="action-btn text-white hover:bg-gray-500"
      icon="i-material-symbols:delete-outline-rounded"
      :title="$t('resumes.delete')"
      :aria-label="$t('resumes.delete')"
      @click="remove"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ResumeListItem } from '~/types'

const props = defineProps<{
  resume: ResumeListItem
}>()

const emit = defineEmits<{
  (e: 'update'): void
}>()

const duplicate = async () => {
  await duplicateResume(props.resume.id)
  emit('update')
}

const remove = async () => {
  await deleteResume(props.resume.id)
  emit('update')
}
</script>
