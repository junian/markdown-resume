<template>
  <ToolItem
    :text="$t('toolbar.paper')"
    icon="i-majesticons:paper-fold-line"
  >
    <USelectMenu
      id="paper-size"
      class="w-full capitalize"
      :items="items"
      :model-value="styles.paper"
      value-key="value"
      label-key="label"
    />
  </ToolItem>
</template>

<script lang="ts" setup>
import type { PaperType } from '~/types'

const { styles, setStyle } = useStyleStore()

const items = Object.keys(PAPER).map(paper => ({
  label: paper,
  value: paper,
  onSelect: () => setStyle('paper', paper as PaperType),
}))
</script>
