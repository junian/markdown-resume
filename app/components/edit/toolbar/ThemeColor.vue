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
            class="size-4 rounded-sm"
            :style="{ backgroundColor: styles.themeColor }"
          />
          <span class="uppercase">{{ styles.themeColor }}</span>
        </div>
      </template>

      <template #content>
        <UColorPicker
          v-model="themeColor"
          class="p-2"
        />
        <UInput
          v-model="hexInput"
          placeholder="#000000"
          maxlength="7"
          class="w-full p-2"
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

// keep the field in sync when a preset or the picker changes the color
watch(() => styles.themeColor, (value) => { hexInput.value = value })

// only save complete, valid hex codes
watch(hexInput, (value) => {
  if (/^#[0-9a-f]{6}$/i.test(value))
    setStyle('themeColor', value)
})

const isActiveColor = (color: string) => styles.themeColor.toUpperCase() === color
</script>
