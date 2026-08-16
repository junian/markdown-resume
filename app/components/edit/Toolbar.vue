<template>
  <div class="flex text-c w-72 h-full min-h-0">
    <Tools />
    <Navbar />
  </div>
</template>

<script lang="tsx" setup>
import File from './toolbar/File.vue'
import Paper from './toolbar/Paper.vue'
import ThemeColor from './toolbar/ThemeColor.vue'
import FontFamily from './toolbar/FontFamily.vue'
import FontSize from './toolbar/FontSize.vue'
import Margins from './toolbar/Margins.vue'
import ParagraphSpace from './toolbar/ParagraphSpace.vue'
import LineHeight from './toolbar/LineHeight.vue'
import CorrectCase from './toolbar/CorrectCase.vue'
import MigrateIconify from './toolbar/MigrateIconify.vue'
import UButton from '@nuxt/ui/components/Button.vue'

const sections = [
  {
    name: 'file',
    icon: 'i-carbon:import-export',
    component: <File id="toolbar-file" />,
  },
  {
    name: 'paper',
    icon: 'i-majesticons:paper-fold-line',
    component: <Paper id="toolbar-paper" />,
  },
  {
    name: 'theme-color',
    icon: 'i-material-symbols:palette-outline',
    component: <ThemeColor id="toolbar-theme-color" />,
  },
  {
    name: 'font-family',
    icon: 'i-material-symbols:font-download-outline',
    component: <FontFamily id="toolbar-font-family" />,
  },
  {
    name: 'font-size',
    icon: 'i-ri:font-size-2',
    component: <FontSize id="toolbar-font-size" />,
  },
  {
    name: 'margins',
    icon: 'i-radix-icons:margin',
    component: <Margins id="toolbar-margins" />,
  },
  {
    name: 'paragraph-space',
    icon: 'i-icon-park-outline:paragraph-break-two',
    component: <ParagraphSpace id="toolbar-paragraph-space" />,
  },
  {
    name: 'line-height',
    icon: 'i-ic:round-format-line-spacing',
    component: <LineHeight id="toolbar-line-height" />,
  },
  {
    name: 'correct-case',
    icon: 'i-icon-park-outline:check-correct',
    component: <CorrectCase id="toolbar-correct-case" />,
  },
  {
    name: 'migrate-iconify',
    icon: 'i-tabler:replace',
    component: <MigrateIconify id="toolbar-migrate-iconify" />,
  },
]

const scrollTo = (name: string) => {
  const toolbar = document.querySelector('#toolbar') as HTMLElement
  const section = document.querySelector(`#toolbar-${name}`) as HTMLElement

  toolbar.scrollTo({
    // offsetTop - header height - margin top
    top: section.offsetTop - 48 - 20,
    behavior: 'smooth',
  })
}

const Tools = () => (
  <div class="pane-container" id="toolbar">
    {sections.map(item => item.component)}
  </div>
)

const Navbar = () => (
  <div class="flex-center flex-col flex-none space-y-1 w-9 md:w-10 border-l border-c border-dashed lg:border-none">
    {sections.map(item => (
      <UButton
        variant="ghost"
        class="round-btn"
        icon={item.icon}
        onClick={() => scrollTo(item.name)}
      />
    ))}
  </div>
)
</script>
