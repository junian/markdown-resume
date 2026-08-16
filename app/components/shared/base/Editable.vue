<template>
  <div
    class="min-w-0 border-[1.5px] rounded hstack"
    :class="isEditing ? 'border-dark-c' : 'border-transparent'"
  >
    <UButton
      variant="ghost"
      class="cursor-pointer hover:bg-gray-200 dark:hover:bg-[#2a2d2e]"
      :class="iconPosition === 'left' ? 'order-first mr-1' : 'order-last ml-1'"
      :ui="{ base: 'p-1 rounded', leadingIcon: 'size-3.5' }"
      icon="i-mdi:pencil"
      :aria-label="$t ? $t('resumes.rename') : 'Rename'"
      :title="$t ? $t('resumes.rename') : 'Rename'"
      @click="startEdit"
    />

    <div class="min-w-0 flex-1 overflow-hidden">
      <UInput
        v-if="isEditing"
        :id="id"
        ref="inputRef"
        v-model="text"
        variant="none"
        size="sm"
        class="min-w-0"
        :class="textAlignClass"
        @blur="commit"
        @keydown.enter="commit"
        @keydown.esc="cancel"
      />
      <div
        v-else
        class="block min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
        :class="textAlignClass"
      >
        {{ displayText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    id: string
    default: string
    onValueCommit: (text: string) => void
    textAlign?: 'left' | 'center' | 'right'
    iconPosition?: 'left' | 'right'
  }>(),
  {
    textAlign: 'center',
    iconPosition: 'right',
  },
)

const isEditing = ref(false)
const text = ref(props.default)
const inputRef = ref()

const textAlignClass = computed(() => {
  switch (props.textAlign) {
    case 'left':
      return 'text-left'
    case 'right':
      return 'text-right'
    default:
      return 'text-center'
  }
})

const displayText = computed(() => text.value || props.default)

const startEdit = () => {
  text.value = props.default
  isEditing.value = true
  nextTick(() => {
    inputRef.value?.inputRef?.focus()
    inputRef.value?.inputRef?.select()
  })
}

const stopEdit = () => {
  isEditing.value = false
}

const commit = () => {
  // Guard against re-entry (e.g. blur firing after Enter commit)
  if (!isEditing.value) return

  const newValue = text.value.trim()
  // Only commit if the value is not empty and different from default
  if (newValue && newValue !== props.default) {
    props.onValueCommit(newValue)
    text.value = newValue
  }
  else {
    // Revert to default if empty or unchanged
    text.value = props.default
  }

  stopEdit()
}

const cancel = () => {
  text.value = props.default
  stopEdit()
}

watch(
  () => props.default,
  (val) => {
    text.value = val
  },
)
</script>
