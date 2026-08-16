<template>
  <div class="absolute right-3 top-3 space-y-2">
    <button
      class="action-btn"
      :title="$t('resumes.duplicate')"
      :aria-label="$t('resumes.duplicate')"
      @click="duplicate"
    >
      <UIcon name="i-ion:duplicate" />
    </button>
    <button
      class="action-btn"
      :title="$t('resumes.delete')"
      :aria-label="$t('resumes.delete')"
      @click="remove"
    >
      <UIcon name="i-material-symbols:delete-outline-rounded" />
    </button>
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
