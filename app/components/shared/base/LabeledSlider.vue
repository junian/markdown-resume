<template>
  <div>
    <div class="py-2">
      <USlider
        v-model="model"
        :min="min"
        :max="max"
        :step="step"
        tooltip
        :ui="{
          track: 'h-1 bg-slate-400/50',
          range: 'bg-brand',
          thumb: 'bg-white dark:bg-slate-300 shadow shadow-slate-500',
        }"
      />
    </div>

    <div class="flex justify-between">
      <span>{{ min }}{{ unit }}</span>
      <span>{{ middle }}{{ unit }}</span>
      <span>{{ max }}{{ unit }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: string
  default: number
  min?: number
  max?: number
  step?: number
  unit?: string
  onValueChange: (value: number) => void
}>()

const model = computed({
  get: () => props.default,
  set: value => props.onValueChange(value),
})

const min = computed(() => props.min || 0)
const max = computed(() => props.max || 100)
const middle = computed(() => (min.value + max.value) / 2)

const unit = computed(() => props.unit || '')
</script>
