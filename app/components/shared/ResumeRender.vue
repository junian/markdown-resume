<template>
  <SmartPages
    :id="id"
    ref="smart"
    :content="renderedContent"
    :height="getPaperPx(styles.paper, 'h')"
    :width="PAPER[styles.paper].w"
    :top="styles.marginV"
    :bottom="Math.max(styles.marginV - 10, CHROME_PRINT_BOTTOM)"
    :left="styles.marginH"
    :right="styles.marginH"
    :before-break-page="() => onFontLoaded(styles)"
    :after-break-page="() => emit('rendered')"
    :watch="[styles.lineHeight, styles.paragraphSpace, styles.fontSize, css]"
    :watch-delay="[styles.fontCJK, styles.fontEN]"
  />
</template>

<script lang="ts" setup>
import SmartPages from '~/libs/vue-smart-pages'
import { replaceIconifyIconsInHtml } from '~/utils/iconifySvg'
import type { ResumeStyles } from '~/types'

const props = defineProps<{
  id: string
  markdown: string
  css?: string
  styles: ResumeStyles
}>()

const smart = ref()

const emit = defineEmits<{
  (e: 'rendered'): void
}>()

const renderedContent = ref('')

// Guard against out-of-order resolution when the markdown changes quickly
// while icons are still being resolved.
let replaceToken = 0

watch(
  () => renderMarkdown(props.markdown),
  async (html) => {
    const token = ++replaceToken
    const replaced = await replaceIconifyIconsInHtml(html)
    if (token === replaceToken) renderedContent.value = replaced
  },
  { immediate: true },
)

const forceUpdate = () => {
  smart.value.resolvePages(100)
}

defineExpose({
  forceUpdate,
})
</script>
