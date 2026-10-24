<template>
  <ToolItem
    :text="$t('toolbar.theme_color')"
    icon="i-material-symbols:palette-outline"
  >
    <!-- Color presets -->
    <div class="flex justify-between mb-4">
      <UButton
        v-for="(color, i) in THEME_COLORS"
        :key="`${i}-${color}`"
        class="size-6 flex-center rounded"
        :style="{ backgroundColor: color, color: '#fff' }"
        :ui="{ leadingIcon: 'size-3.5' }"
        :icon="isActiveColor(color) ? 'i-line-md:confirm' : undefined"
        :aria-label="$t('toolbar.select_color', { color })"
        :title="$t('toolbar.select_color', { color })"
        @click="themeColor = color"
      />
    </div>

    <!-- Color picker -->
    <UPopover class="w-full">
      <template #default="{ open }">
        <div
          class="w-full hstack h-9 space-x-2 px-2 py-1 rounded border cursor-pointer"
          :class="open ? 'border-darker-c' : 'border-c'"
        >
          <span
            class="size-4 shrink-0 rounded-sm"
            :style="{ backgroundColor: styles.themeColor }"
          />
          <UInput
            v-model="hexInput"
            type="text"
            variant="none"
            size="sm"
            class="w-full min-w-0"
            :ui="{ base: 'px-0 py-0 text-xs md:text-sm uppercase outline-none' }"
            spellcheck="false"
            autocomplete="off"
            :aria-label="$t('toolbar.theme_color')"
            @click.stop
            @update:model-value="onHexInput"
            @keydown.enter="commitHex"
            @keydown.esc="resetHex"
            @blur="commitHex"
          />
        </div>
      </template>

      <template #content>
        <UColorPicker
          v-model="themeColor"
          class="p-2"
        />
      </template>
    </UPopover>
  </ToolItem>
</template>

<script lang="ts" setup>
const { styles, setStyle } = useStyleStore()

const themeColor = computed({
  get: () => styles.themeColor,
  set: value => setStyle('themeColor', value),
})

const hexInput = ref(styles.themeColor)

watch(
  () => styles.themeColor,
  color => (hexInput.value = color),
)

const normalizeHex = (value: string) => {
  let hex = value.trim().replace(/^#/, '')
  if (/^[0-9a-f]{3}$/i.test(hex))
    hex = hex.split('').map(char => char + char).join('')
  if (!/^[0-9a-f]{6}$/i.test(hex)) return null
  return `#${hex.toUpperCase()}`
}

const onHexInput = (value: string) => {
  const hex = value.trim().replace(/^#/, '')
  if (/^[0-9a-f]{6}$/i.test(hex)) themeColor.value = `#${hex.toUpperCase()}`
}

const commitHex = () => {
  const hex = normalizeHex(hexInput.value)
  if (hex) themeColor.value = hex
  hexInput.value = hex ?? styles.themeColor
}

const resetHex = () => (hexInput.value = styles.themeColor)

const isActiveColor = (color: string) => styles.themeColor.toUpperCase() === color
</script>
