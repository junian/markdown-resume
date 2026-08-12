<template>
  <div class="content-page sidebar-layout">
    <Header />

    <main class="max-w-210 mx-auto px-5 py-12 md:px-10 md:py-16 text-dark-c">
      <template v-if="page">
        <div class="mb-10">
          <div class="hstack gap-3 mb-3">
            <span class="circle size-10 bg-brand text-white">
              <span
                :class="iconClass"
                text-xl
              />
            </span>
            <h1 class="text-3xl font-bold">
              {{ page.title }}
            </h1>
          </div>
          <p
            v-if="page.lastModified"
            class="text-sm text-light-c"
          >
            Last updated: {{ lastModifiedText }}
          </p>
        </div>

        <div class="page-content">
          <ContentRenderer :value="page" />
        </div>
      </template>

      <template v-else>
        <div class="flex-center flex-col gap-3 py-24 text-center">
          <span
            i-mdi:file-question-outline
            text-5xl
            text-lighter-c
          />
          <p class="text-lg font-bold">
            Page not found
          </p>
          <p class="text-sm text-light-c">
            This page doesn't exist.
          </p>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const slug = computed(() => {
  const lang = route.params.lang
  const rest = route.params.slug
  let segments = [
    ...(Array.isArray(lang) ? lang : lang ? [lang] : []),
    ...(Array.isArray(rest) ? rest : rest ? [rest] : []),
  ]
  if (segments[0] === locale.value) {
    segments = segments.slice(1)
  }
  return `/${segments.join('/')}`
})

const { data: page } = await useAsyncData(
  `content-page:${locale.value}:${slug.value}`,
  async () => {
    const pathFor = (lang: string) => `/${lang}${slug.value}`
    let doc = await queryCollection('content').path(pathFor(locale.value)).first()
    if (!doc && locale.value !== 'en') {
      doc = await queryCollection('content').path(pathFor('en')).first()
    }
    return doc
  },
  { watch: [locale, slug] },
)

const iconMap: Record<string, string> = {
  about: 'i-mdi:information-outline',
  privacy: 'i-mdi:shield-lock-outline',
}

const iconClass = computed(() => iconMap[slug.value.slice(1)] ?? 'i-mdi:file-document-outline')

const lastModifiedText = computed(() => {
  const raw = page.value?.lastModified
  if (!raw) {
    return ''
  }
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) {
    return raw
  }
  const lang = locale.value === 'sp' ? 'es' : locale.value
  return new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(date)
})

useHead(() => ({
  title: page.value ? `${page.value.title} — Markdown Resume` : undefined,
}))
</script>

<style scoped>
.page-content {
  @apply space-y-8 leading-7 text-gray-700 dark:text-gray-200;
}

.page-content :deep(h2) {
  @apply text-xl font-bold text-black dark:text-white;
}

.page-content :deep(ul) {
  @apply list-disc pl-5 space-y-1;
}

.page-content :deep(a) {
  @apply text-brand underline underline-offset-2;
}

.page-content :deep(table) {
  @apply w-full border-collapse text-sm;
}

.page-content :deep(thead) {
  @apply border-b border-gray-300 dark:border-gray-600;
}

.page-content :deep(th) {
  @apply text-left font-bold text-black dark:text-white py-3 px-4;
}

.page-content :deep(tbody tr) {
  @apply border-b border-gray-200 dark:border-gray-700;
}

.page-content :deep(tbody tr:last-child) {
  @apply border-b-0;
}

.page-content :deep(td) {
  @apply py-3 px-4 text-gray-700 dark:text-gray-300;
}

.page-content :deep(td a) {
  @apply text-brand hover:underline;
}
</style>
