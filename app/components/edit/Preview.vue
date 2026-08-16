<template>
  <div class="pane-container">
    <Zoom
      ref="zoom"
      :scale="scale"
    >
      <ResumeRender
        id="preview"
        :markdown="data.mdContent"
        :css="data.cssContent"
        :styles="styles"
      />
    </Zoom>

    <div
      class="zoom-bar hstack fixed bottom-4 lg:bottom-auto lg:top-[3.75rem] ml-2 shadow-c rounded-full overflow-hidden text-white bg-blue-500 lg:opacity-0 hover:opacity-100"
    >
      <UButton
        variant="ghost"
        class="zoom-bar-button text-white rounded-none"
        icon="i-lucide:zoom-in"
        :aria-label="$t('zoom.in')"
        :title="$t('zoom.in')"
        @click="scale *= 1.1"
      />
      <UButton
        variant="ghost"
        class="zoom-bar-button text-white rounded-none"
        icon="i-lucide:zoom-out"
        :aria-label="$t('zoom.out')"
        :title="$t('zoom.out')"
        @click="scale /= 1.1"
      />
      <UButton
        variant="ghost"
        class="zoom-bar-button text-white rounded-none"
        icon="i-fluent:arrow-autofit-width-20-filled"
        :aria-label="$t('zoom.fit_width')"
        :title="$t('zoom.fit_width')"
        @click="fitWidth"
      />
      <UButton
        variant="ghost"
        class="zoom-bar-button text-white rounded-none"
        icon="i-fluent:arrow-autofit-height-20-filled"
        :aria-label="$t('zoom.fit_height')"
        :title="$t('zoom.fit_height')"
        @click="fitHeight"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'ts-debounce'
import Zoom from '~/libs/vue-zoom'

const scale = ref(1)
const zoom = ref<InstanceType<typeof Zoom>>()

const { width, height } = useElementSize(zoom)
const { styles } = useStyleStore()
const { data } = useDataStore()

const fitWidth = () => {
  scale.value = width.value / getPaperPx(styles.paper, 'w')
}

const fitHeight = () => {
  scale.value = height.value / getPaperPx(styles.paper, 'h')
}

// Debounce instance is created once so pane resize events coalesce
const fitWidthDebounced = debounce(fitWidth, 100)

watch(width, () => fitWidthDebounced())
</script>
