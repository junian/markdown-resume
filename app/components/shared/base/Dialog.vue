<template>
  <div v-bind="api.triggerProps">
    <slot name="button">
      Open dialog
    </slot>
  </div>

  <Teleport to="body">
    <div v-if="api.isOpen">
      <div v-bind="api.backdropProps" />
      <div v-bind="api.positionerProps">
        <div
          v-bind="api.contentProps"
          class="font-ui h-fit z-30 fixed inset-0 m-auto bg-c flex flex-col overflow-hidden text-c shadow-c border border-gray-400 dark:border-neutral-700 rounded-md"
          :class="boxClass"
        >
          <div class="hstack justify-between pl-4 pr-3 py-2.5">
            <div class="hstack text-sm">
              <span :class="icon" />
              <span class="mx-2 text-light-c">/</span>
              <span v-bind="api.titleProps">{{ title }}</span>
            </div>

            <button
              class="circle p-1 duration-100 hover:bg-dark-c hover:rotate-90"
              v-bind="api.closeTriggerProps"
            >
              <span class="i-ic:baseline-close" />
            </button>
          </div>

          <slot name="content" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/vue'

const props = defineProps<{
  id: string
  title: string
  icon: string
  boxClass?: string
}>()

const [state, send] = useMachine(dialog.machine({ id: props.id }))
const api = computed(() => dialog.connect(state.value, send, normalizeProps))
</script>
