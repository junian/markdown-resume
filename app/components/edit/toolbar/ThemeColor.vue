<template>
  <ToolItem
    :text="$t('toolbar.theme_color')"
    icon="i-material-symbols:palette-outline"
  >
    <!-- Color presets -->
    <div class="flex justify-between mb-4">
      <button
        v-for="(color, i) in THEME_COLORS"
        :key="`${i}-${color}`"
        class="size-6 flex-center rounded text-white"
        :style="{ backgroundColor: color }"
        @click="themeColor = color"
      >
        <UIcon
          v-show="isActiveColor(color)"
          name="i-line-md:confirm"
        />
      </button>
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

const isActiveColor = (color: string) => styles.themeColor.toUpperCase() === color
</script>
