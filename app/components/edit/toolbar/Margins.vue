<template>
  <ToolItem
    :text="$t('toolbar.margin')"
    icon="i-radix-icons:margin"
  >
    <div class="grid grid-cols-3 gap-2 mb-4">
      <UButton
        size="md"
        class="w-full h-14 flex-col py-2 text-xs"
        :variant="isNormal ? 'solid' : 'outline'"
        :color="isNormal ? 'primary' : 'neutral'"
        icon="i-radix-icons:margin"
        @click="applyPreset('normal')"
      >
        Normal
      </UButton>
      <UButton
        size="md"
        class="w-full h-14 flex-col py-2 text-xs"
        :variant="isNarrow ? 'solid' : 'outline'"
        :color="isNarrow ? 'primary' : 'neutral'"
        icon="i-icon-park-outline:margin"
        @click="applyPreset('narrow')"
      >
        Narrow
      </UButton>
      <UButton
        size="md"
        class="w-full h-14 flex-col py-2 text-xs"
        :variant="isModerate ? 'solid' : 'outline'"
        :color="isModerate ? 'primary' : 'neutral'"
        icon="i-icon-park-outline:margin-one"
        @click="applyPreset('moderate')"
      >
        Moderate
      </UButton>
    </div>

    <div class="mb-4 text-light-c">
      <div class="hstack space-x-1 justify-end">
        <UIcon name="i-icon-park-outline:margin-one" />
        <span>{{ $t("toolbar.vertical") }}</span>
      </div>

      <LabeledSlider
        id="margin-v"
        unit="px"
        :default="styles.marginV"
        :on-value-change="setMarginV"
      />
    </div>

    <div class="text-light-c">
      <div class="hstack space-x-1 justify-end">
        <UIcon name="i-icon-park-outline:margin" />
        <span>{{ $t("toolbar.horizontal") }}</span>
      </div>

      <LabeledSlider
        id="margin-h"
        unit="px"
        :default="styles.marginH"
        :on-value-change="setMarginH"
      />
    </div>
  </ToolItem>
</template>

<script lang="ts" setup>
const { styles, setStyle } = useStyleStore()

const setMarginV = (value: number) => setStyle('marginV', value)
const setMarginH = (value: number) => setStyle('marginH', value)

const presets = {
  normal: { marginV: 96, marginH: 96 },
  narrow: { marginV: 48, marginH: 48 },
  moderate: { marginV: 96, marginH: 72 },
} as const

const applyPreset = (preset: keyof typeof presets) => {
  const { marginV, marginH } = presets[preset]
  setStyle('marginV', marginV)
  setStyle('marginH', marginH)
}

const isNormal = computed(() => styles.marginV === presets.normal.marginV && styles.marginH === presets.normal.marginH)
const isNarrow = computed(() => styles.marginV === presets.narrow.marginV && styles.marginH === presets.narrow.marginH)
const isModerate = computed(() => styles.marginV === presets.moderate.marginV && styles.marginH === presets.moderate.marginH)
</script>
