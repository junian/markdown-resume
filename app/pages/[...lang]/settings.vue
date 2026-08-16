<template>
  <div class="settings-page sidebar-layout">
    <MainSidebar />

    <main class="max-w-[60rem] mx-auto px-5 py-12 md:px-10 md:py-16 text-dark-c">
      <div class="hstack gap-3 mb-10">
        <span class="circle size-10 bg-brand text-white">
          <UIcon
            name="i-ic:outline-settings"
            class="text-xl"
          />
        </span>
        <div>
          <h1 class="text-3xl font-bold">
            {{ $t("settings.title") }}
          </h1>
          <p class="mt-1 text-sm text-light-c">
            {{ $t("settings.description") }}
          </p>
        </div>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        <section class="settings-card md:col-span-2">
          <div class="settings-card-heading">
            <UIcon
              name="i-mdi:tune"
              class="text-xl"
            />
            <h2>{{ $t("settings.defaults.title") }}</h2>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                class="field-label"
                for="default-full-name"
              >
                {{ $t("settings.defaults.name") }}
              </label>
              <UInput
                id="default-full-name"
                v-model="defaultFullName"
                class="w-full"
                :placeholder="$t('settings.defaults.name_placeholder')"
                @update:model-value="setDefaultFullName"
              />
            </div>
            <div>
              <label
                class="field-label"
                for="default-paper-size"
              >
                {{ $t("settings.defaults.paper_size") }}
              </label>
              <USelectMenu
                id="default-paper-size"
                class="w-full capitalize"
                :items="paperItems"
                :model-value="defaultPaperSize"
                value-key="value"
                label-key="label"
              />
            </div>
          </div>
        </section>
        <section class="settings-card">
          <div class="settings-card-heading">
            <UIcon
              name="i-ic:round-translate"
              class="text-xl"
            />
            <h2>{{ $t("settings.language") }}</h2>
          </div>
          <label
            class="field-label"
            for="settings-language"
          >{{
            $t("settings.language_label")
          }}</label>
          <USelectMenu
            id="settings-language"
            v-model="selectedLanguage"
            :items="languageItems"
            :search-input="{
              placeholder: t('settings.filter_language'),
              icon: 'i-lucide-search',
            }"
            class="w-full"
          />
        </section>

        <section class="settings-card">
          <div class="settings-card-heading">
            <UIcon
              name="i-ph:paint-brush-bold"
              class="text-xl"
            />
            <h2>{{ $t("settings.appearance") }}</h2>
          </div>
          <div
            class="grid grid-cols-3 gap-2"
            role="radiogroup"
            :aria-label="$t('settings.theme')"
          >
            <button
              v-for="mode in themeModes"
              :key="mode.value"
              class="theme-option"
              :class="{ 'theme-option--active': colorMode.preference === mode.value }"
              type="button"
              role="radio"
              :aria-checked="colorMode.preference === mode.value"
              @click="colorMode.preference = mode.value"
            >
              <UIcon
                :name="mode.icon"
                class="text-xl"
              />
              <span>{{ mode.label }}</span>
            </button>
          </div>
        </section>

        <section class="settings-card md:col-span-2">
          <div class="settings-card-heading">
            <UIcon
              name="i-mdi:code-braces"
              class="text-xl"
            />
            <h2>{{ $t("settings.editor") }}</h2>
          </div>
          <div class="editor-settings">
            <UCheckbox
              id="editor-minimap"
              v-model="minimapEnabled"
              class="editor-setting"
              :label="$t('settings.minimap')"
              :description="$t('settings.minimap_description')"
              @update:model-value="enabled => setEditorMinimapEnabled(enabled === true)"
            />
            <UCheckbox
              id="editor-line-numbers"
              v-model="lineNumbersEnabled"
              class="editor-setting"
              :label="$t('settings.line_numbers')"
              :description="$t('settings.line_numbers_description')"
              @update:model-value="enabled => setEditorLineNumbersEnabled(enabled === true)"
            />
          </div>
        </section>

        <section class="settings-card md:col-span-2">
          <div class="settings-card-heading">
            <UIcon
              name="i-mdi:database-outline"
              class="text-xl"
            />
            <h2>{{ $t("settings.storage") }}</h2>
            <button
              class="storage-refresh-button"
              type="button"
              :title="$t('settings.refresh_storage')"
              :aria-label="$t('settings.refresh_storage')"
              :disabled="isRefreshingStorage"
              @click="refreshStorageEstimate"
            >
              <UIcon
                name="i-mdi:refresh"
                class="text-lg"
                :class="{ 'animate-spin': isRefreshingStorage }"
              />
            </button>
          </div>
          <p class="storage-description">
            {{ $t("settings.storage_estimate_note") }}
          </p>

          <div class="storage-overview">
            <div
              v-if="storageSupported && isRefreshingStorage"
              class="storage-ring storage-ring--loading"
              aria-hidden="true"
            />
            <div
              v-else-if="storageSupported"
              class="storage-ring"
              :style="{ '--storage-percent': `${storagePercent}%` }"
              role="progressbar"
              :aria-label="$t('settings.storage_used')"
              :aria-valuenow="storagePercent"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div class="storage-ring-center">
                <strong>{{ displayPercent }}</strong>
                <span>{{ $t("settings.used") }}</span>
              </div>
            </div>
            <p
              v-else
              class="storage-unavailable"
            >
              {{ $t("settings.storage_unavailable") }}
            </p>

            <dl class="storage-stats">
              <div
                v-if="storageSupported"
                class="storage-stat"
              >
                <template v-if="isRefreshingStorage">
                  <dt class="storage-skeleton storage-skeleton--label" />
                  <dd class="storage-skeleton storage-skeleton--value" />
                </template>
                <template v-else>
                  <dt>{{ $t("settings.usage") }}</dt>
                  <dd>{{ formatBytes(storageUsage) }}</dd>
                </template>
              </div>
              <div
                v-if="storageSupported"
                class="storage-stat"
              >
                <template v-if="isRefreshingStorage">
                  <dt class="storage-skeleton storage-skeleton--label" />
                  <dd class="storage-skeleton storage-skeleton--value" />
                </template>
                <template v-else>
                  <dt>{{ $t("settings.quota") }}</dt>
                  <dd>{{ formatBytes(storageQuota) }}</dd>
                </template>
              </div>
              <div class="storage-stat">
                <template v-if="isRefreshingStorage">
                  <dt class="storage-skeleton storage-skeleton--label" />
                  <dd class="storage-skeleton storage-skeleton--value" />
                </template>
                <template v-else>
                  <dt>{{ $t("settings.resumes") }}</dt>
                  <dd>{{ resumeCount }}</dd>
                </template>
              </div>
              <div class="storage-stat">
                <template v-if="isRefreshingStorage">
                  <dt class="storage-skeleton storage-skeleton--label" />
                  <dd class="storage-skeleton storage-skeleton--value" />
                </template>
                <template v-else>
                  <dt>{{ $t("settings.images") }}</dt>
                  <dd>{{ imageCount }}</dd>
                </template>
              </div>
            </dl>
          </div>
        </section>

        <section class="settings-card danger-card md:col-span-2">
          <div class="settings-card-heading danger-heading">
            <UIcon
              name="i-mdi:alert-outline"
              class="text-xl"
            />
            <h2>{{ $t("settings.danger_zone") }}</h2>
          </div>
          <p class="danger-description">
            {{ $t("settings.danger_description") }}
          </p>

          <AppDialog
            id="erase-all-data"
            :title="$t('settings.erase_all_data')"
            icon="i-mdi:alert-outline"
            box-class="w-11/12 max-w-[27.5rem]"
          >
            <template #button>
              <button
                class="danger-button"
                type="button"
                @click="deleteConfirmation = ''"
              >
                <UIcon
                  name="i-mdi:delete-forever-outline"
                  class="text-lg"
                />
                <span>{{ $t("settings.erase_all_data") }}</span>
              </button>
            </template>

            <template #content>
              <div class="danger-dialog-content">
                <p>{{ $t("settings.erase_warning") }}</p>
                <label
                  for="delete-confirmation"
                  class="field-label mb-0"
                >
                  {{ $t("settings.type_delete") }}
                </label>
                <UInput
                  id="delete-confirmation"
                  v-model="deleteConfirmation"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="DELETE"
                  color="error"
                  class="w-full"
                  :ui="{ base: 'font-mono' }"
                />
                <button
                  class="danger-confirm-button"
                  type="button"
                  :disabled="deleteConfirmation !== 'DELETE' || isErasing"
                  @click="eraseAllData"
                >
                  {{ $t("settings.confirm") }}
                </button>
              </div>
            </template>
          </AppDialog>
        </section>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import {
  getDefaultFullName,
  setDefaultFullName,
  getDefaultPaperSize,
  setDefaultPaperSize,
  DEFAULT_FULL_NAME_STORAGE_KEY,
  DEFAULT_PAPER_SIZE_STORAGE_KEY,
} from '~/utils/defaultSettings'
import { PAPER } from '~/utils/constants/data'
import type { PaperType } from '~/types'

import type { SelectMenuItem } from '@nuxt/ui'

const colorMode = useColorMode()
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const languageItems = computed<SelectMenuItem[]>(() =>
  locales.value.map(item => ({
    label: item.name,
    value: item.code,
    icon: item.icon,
  })),
)

const selectedLanguage = computed<SelectMenuItem | undefined>({
  get: () =>
    languageItems.value.find(
      item => typeof item === 'object' && item !== null && item.value === locale.value,
    ),
  set: (item) => {
    if (typeof item === 'object' && item !== null && item.value && item.value !== locale.value) {
      navigateTo(switchLocalePath(item.value))
    }
  },
})

const themeModes = computed(() => [
  { value: 'system', label: t('settings.auto'), icon: 'i-ph:desktop-bold' },
  { value: 'light', label: t('settings.light'), icon: 'i-ph:sun-bold' },
  { value: 'dark', label: t('settings.dark'), icon: 'i-ph:moon-bold' },
])

const storageSupported = ref(true)
const storageUsage = ref(0)
const storageQuota = ref(0)
const resumeCount = ref(0)
const imageCount = ref(0)
const isRefreshingStorage = ref(false)
const storagePercent = computed(() =>
  storageQuota.value ? Math.min(100, (storageUsage.value / storageQuota.value) * 100) : 0,
)
const deleteConfirmation = ref('')
const isErasing = ref(false)
const minimapEnabled = ref(true)
const lineNumbersEnabled = ref(true)
const defaultFullName = ref('')
const defaultPaperSize = ref<PaperType>('A4')
const paperItems = Object.keys(PAPER).map(paper => ({
  label: paper,
  value: paper,
  onSelect: () => {
    defaultPaperSize.value = paper as PaperType
    setDefaultPaperSize(paper)
  },
}))

const eraseAllData = async () => {
  if (deleteConfirmation.value !== 'DELETE' || isErasing.value) return

  isErasing.value = true
  await Promise.all([
    clearResumeStorage(),
    clearImageStorage(),
  ])
  localStorage.removeItem(NAVIGATION_COLLAPSED_STORAGE_KEY)
  localStorage.removeItem('nuxt-color-mode')
  localStorage.removeItem(EDITOR_MINIMAP_STORAGE_KEY)
  localStorage.removeItem(EDITOR_LINE_NUMBERS_STORAGE_KEY)
  localStorage.removeItem(DEFAULT_FULL_NAME_STORAGE_KEY)
  localStorage.removeItem(DEFAULT_PAPER_SIZE_STORAGE_KEY)
  window.location.reload()
}
const displayPercent = computed(() => {
  if (storagePercent.value > 0 && storagePercent.value < 0.1) return '<0.1%'
  return `${storagePercent.value.toFixed(1)}%`
})

const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  return `${(bytes / 1024 ** unit).toFixed(unit ? 1 : 0)} ${units[unit]}`
}

const refreshStorageEstimate = async () => {
  if (isRefreshingStorage.value) return

  isRefreshingStorage.value = true
  const minimumDelay = new Promise(resolve => window.setTimeout(resolve, 800))
  let estimate: StorageEstimate | undefined
  let resumes: Awaited<ReturnType<typeof getResumeList>> = []
  let images: Awaited<ReturnType<typeof getImageList>> = []
  let isSupported = Boolean(navigator.storage?.estimate)

  try {
    [estimate, resumes, images] = await Promise.all([
      isSupported
        ? navigator.storage.estimate().catch(() => {
            isSupported = false
            return undefined
          })
        : Promise.resolve(undefined),
      getResumeList().catch(() => []),
      getImageList().catch(() => []),
    ])
  }
  finally {
    await minimumDelay
    storageUsage.value = estimate?.usage || 0
    storageQuota.value = estimate?.quota || 0
    resumeCount.value = resumes.length
    imageCount.value = images.length
    storageSupported.value = isSupported
    isRefreshingStorage.value = false
  }
}

onMounted(async () => {
  minimapEnabled.value = getEditorMinimapEnabled()
  lineNumbersEnabled.value = getEditorLineNumbersEnabled()
  defaultFullName.value = getDefaultFullName()
  defaultPaperSize.value = getDefaultPaperSize() as PaperType
  await refreshStorageEstimate()
})

useHead({ title: () => `${t('settings.title')} — Markdown Resume` })
</script>
