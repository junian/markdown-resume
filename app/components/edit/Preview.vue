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
      <button
        class="zoom-bar-button"
        @click="scale *= 1.1"
      >
        <UIcon name="i-lucide:zoom-in" />
      </button>
      <button
        class="zoom-bar-button"
        @click="scale /= 1.1"
      >
        <UIcon name="i-lucide:zoom-out" />
      </button>
      <button
        class="zoom-bar-button"
        @click="fitWidth"
      >
        <UIcon name="i-fluent:arrow-autofit-width-20-filled" />
      </button>
      <button
        class="zoom-bar-button"
        @click="fitHeight"
      >
        <UIcon name="i-fluent:arrow-autofit-height-20-filled" />
      </button>
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

watch(width, () => debounce(fitWidth, 100)())
</script>
