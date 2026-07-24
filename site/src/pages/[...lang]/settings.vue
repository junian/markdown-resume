<template>
  <div class="settings-page sidebar-layout">
    <Header />

    <main class="max-w-240 mx-auto px-5 py-12 md:px-10 md:py-16 text-dark-c">
      <div class="hstack gap-3 mb-10">
        <span class="circle size-10 bg-brand text-white">
          <span i-ic:outline-settings text-xl />
        </span>
        <div>
          <h1 class="text-3xl font-bold">{{ $t("settings.title") }}</h1>
          <p class="mt-1 text-sm text-light-c">{{ $t("settings.description") }}</p>
        </div>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        <section class="settings-card md:col-span-2">
          <div class="settings-card-heading">
            <span i-mdi:tune text-xl />
            <h2>Defaults</h2>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="field-label" for="default-full-name">
                Full Name
              </label>
              <input
                id="default-full-name"
                v-model="defaultFullName"
                @input="setDefaultFullName(defaultFullName)"
                class="language-menu-trigger"
                type="text"
                placeholder="e.g., Bruce Wayne"
              />
            </div>
            <div>
              <label class="field-label" for="default-paper-size">
                Paper Size
              </label>
              <Combobox id="default-paper-size" :items="paperItems" :default="defaultPaperSize" capitalize />
            </div>
          </div>
        </section>
        <section
          class="settings-card"
          :class="{ 'settings-card--menu-open': languageApi.open }"
        >
          <div class="settings-card-heading">
            <span i-ic:round-translate text-xl />
            <h2>{{ $t("settings.language") }}</h2>
          </div>
          <label class="field-label" for="settings-language">{{
            $t("settings.language_label")
          }}</label>
          <div class="language-menu">
            <button
              id="settings-language"
              v-bind="languageApi.triggerProps"
              class="language-menu-trigger"
              type="button"
            >
              <span :class="currentLocale?.icon" text-lg />
              <span class="min-w-0 flex-1 truncate text-left">
                {{ currentLocale?.name }}
              </span>
              <span
                i-tabler:chevron-down
                class="language-menu-chevron"
                :class="{ 'rotate-180': languageApi.open }"
              />
            </button>

            <div v-bind="languageApi.positionerProps" class="z-50">
              <ul v-bind="languageApi.contentProps" class="language-menu-content">
                <li
                  v-for="item in locales"
                  :key="item.code"
                  v-bind="languageApi.getItemProps({ value: item.code })"
                  class="language-menu-item"
                >
                  <span :class="item.icon" text-base />
                  <span class="min-w-0 flex-1 truncate">{{ item.name }}</span>
                  <span v-if="item.code === locale" i-tabler:check text-base />
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section class="settings-card">
          <div class="settings-card-heading">
            <span i-ph:paint-brush-bold text-xl />
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
              <span :class="mode.icon" text-xl />
              <span>{{ mode.label }}</span>
            </button>
          </div>
        </section>

        <section class="settings-card md:col-span-2">
          <div class="settings-card-heading">
            <span i-mdi:code-braces text-xl />
            <h2>{{ $t("settings.editor") }}</h2>
          </div>
          <div class="editor-settings">
            <label class="editor-setting" for="editor-minimap">
              <input
                id="editor-minimap"
                v-model="minimapEnabled"
                class="editor-checkbox"
                type="checkbox"
                @change="saveMinimapSetting"
              />
              <span>
                <span class="block font-bold">{{ $t("settings.minimap") }}</span>
                <span class="mt-1 block text-sm text-light-c">
                  {{ $t("settings.minimap_description") }}
                </span>
              </span>
            </label>
            <label class="editor-setting" for="editor-line-numbers">
              <input
                id="editor-line-numbers"
                v-model="lineNumbersEnabled"
                class="editor-checkbox"
                type="checkbox"
                @change="saveLineNumbersSetting"
              />
              <span>
                <span class="block font-bold">{{ $t("settings.line_numbers") }}</span>
                <span class="mt-1 block text-sm text-light-c">
                  {{ $t("settings.line_numbers_description") }}
                </span>
              </span>
            </label>
          </div>
        </section>

        <section class="settings-card md:col-span-2">
          <div class="settings-card-heading">
            <span i-mdi:database-outline text-xl />
            <h2>{{ $t("settings.storage") }}</h2>
            <button
              class="storage-refresh-button"
              type="button"
              :title="$t('settings.refresh_storage')"
              :aria-label="$t('settings.refresh_storage')"
              :disabled="isRefreshingStorage"
              @click="refreshStorageEstimate"
            >
              <span
                i-mdi:refresh
                text-lg
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
            <p v-else class="storage-unavailable">
              {{ $t("settings.storage_unavailable") }}
            </p>

            <dl class="storage-stats">
              <div v-if="storageSupported" class="storage-stat">
                <template v-if="isRefreshingStorage">
                  <dt class="storage-skeleton storage-skeleton--label" />
                  <dd class="storage-skeleton storage-skeleton--value" />
                </template>
                <template v-else>
                  <dt>{{ $t("settings.usage") }}</dt>
                  <dd>{{ formatBytes(storageUsage) }}</dd>
                </template>
              </div>
              <div v-if="storageSupported" class="storage-stat">
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
            <span i-mdi:alert-outline text-xl />
            <h2>{{ $t("settings.danger_zone") }}</h2>
          </div>
          <p class="danger-description">
            {{ $t("settings.danger_description") }}
          </p>

          <Dialog
            id="erase-all-data"
            :title="$t('settings.erase_all_data')"
            icon="i-mdi:alert-outline"
            box-class="w-11/12 max-w-110"
          >
            <template #button>
              <button
                class="danger-button"
                type="button"
                @click="deleteConfirmation = ''"
              >
                <span i-mdi:delete-forever-outline text-lg />
                <span>{{ $t("settings.erase_all_data") }}</span>
              </button>
            </template>

            <template #content>
              <div class="danger-dialog-content">
                <p>{{ $t("settings.erase_warning") }}</p>
                <label for="delete-confirmation" class="field-label mb-0">
                  {{ $t("settings.type_delete") }}
                </label>
                <input
                  id="delete-confirmation"
                  v-model="deleteConfirmation"
                  class="danger-confirmation-input"
                  type="text"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="DELETE"
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
          </Dialog>
        </section>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/vue";
import { siteConfig } from "~~/configs/siteConfig";
import {
  getDefaultFullName,
  setDefaultFullName,
  getDefaultPaperSize,
  setDefaultPaperSize,
} from "~/utils/defaultSettings";
import { PAPER } from "~/utils/constants/data";
import type { PaperType } from "~/types";

const colorMode = useColorMode();
const { t, locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const appBaseURL = useRuntimeConfig().app.baseURL;

const currentLocale = computed(() =>
  locales.value.find((item) => item.code === locale.value)
);

const [languageState, languageSend] = useMachine(
  menu.machine({
    id: "settings-language-menu",
    "aria-label": t("settings.language_label"),
    positioning: { placement: "bottom-start", sameWidth: true, gutter: 6 },
    onSelect: ({ value }) => navigateTo(switchLocalePath(value))
  })
);

const languageApi = computed(() =>
  menu.connect(languageState.value, languageSend, normalizeProps)
);

const themeModes = computed(() => [
  { value: "light", label: t("settings.light"), icon: "i-ph:sun-bold" },
  { value: "dark", label: t("settings.dark"), icon: "i-ph:moon-bold" },
  { value: "system", label: t("settings.auto"), icon: "i-ph:desktop-bold" }
]);

const storageSupported = ref(true);
const storageUsage = ref(0);
const storageQuota = ref(0);
const resumeCount = ref(0);
const imageCount = ref(0);
const isRefreshingStorage = ref(false);
const storagePercent = computed(() =>
  storageQuota.value ? Math.min(100, (storageUsage.value / storageQuota.value) * 100) : 0
);
const deleteConfirmation = ref("");
const isErasing = ref(false);
const minimapEnabled = ref(true);
const lineNumbersEnabled = ref(true);
const defaultFullName = ref("");
const defaultPaperSize = ref<PaperType>("A4");
const paperItems = Object.keys(PAPER).map((paper) => ({
  label: paper,
  value: paper,
  onSelect: () => {
    defaultPaperSize.value = paper as PaperType;
    setDefaultPaperSize(paper);
  },
}));

const saveMinimapSetting = () => setEditorMinimapEnabled(minimapEnabled.value);
const saveLineNumbersSetting = () =>
  setEditorLineNumbersEnabled(lineNumbersEnabled.value);

const clearServiceWorkerData = async () => {
  const appUrl = new URL(appBaseURL, window.location.origin);

  const cacheCleanup = async () => {
    if (!("caches" in window)) return;

    const cacheNames = await caches.keys();
    const appPath = appUrl.pathname === "/" ? "/" : appUrl.pathname.replace(/\/$/, "");
    await Promise.all(
      cacheNames
        .filter(
          (name) =>
            name.startsWith(`${siteConfig.cacheId}-`) ||
            name === "google-fonts-cache" ||
            (name.startsWith("workbox-precache-") &&
              (appPath === "/" || name.includes(appPath)))
        )
        .map((name) => caches.delete(name))
    );
  };

  const serviceWorkerCleanup = async () => {
    if (!("serviceWorker" in navigator)) return;

    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations
        .filter((registration) => registration.scope.startsWith(appUrl.href))
        .map((registration) => registration.unregister())
    );
  };

  await Promise.allSettled([serviceWorkerCleanup()]);
  await Promise.allSettled([cacheCleanup()]);
};

const eraseAllData = async () => {
  if (deleteConfirmation.value !== "DELETE" || isErasing.value) return;

  isErasing.value = true;
  await Promise.all([
    clearResumeStorage(),
    clearImageStorage()
  ]);
  localStorage.removeItem("navigation-collapsed");
  localStorage.removeItem("nuxt-color-mode");
  localStorage.removeItem(EDITOR_MINIMAP_STORAGE_KEY);
  localStorage.removeItem(EDITOR_LINE_NUMBERS_STORAGE_KEY);
  localStorage.removeItem("default-full-name");
  localStorage.removeItem("default-paper-size");
  window.location.reload();
};
const displayPercent = computed(() => {
  if (storagePercent.value > 0 && storagePercent.value < 0.1) return "<0.1%";
  return `${storagePercent.value.toFixed(1)}%`;
});

const formatBytes = (bytes: number) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** unit).toFixed(unit ? 1 : 0)} ${units[unit]}`;
};

const refreshStorageEstimate = async () => {
  if (isRefreshingStorage.value) return;

  isRefreshingStorage.value = true;
  const minimumDelay = new Promise((resolve) => window.setTimeout(resolve, 800));
  let estimate: StorageEstimate | undefined;
  let resumes: Awaited<ReturnType<typeof getResumeList>> = [];
  let images: Awaited<ReturnType<typeof getImageList>> = [];
  let isSupported = Boolean(navigator.storage?.estimate);

  try {
    [estimate, resumes, images] = await Promise.all([
      isSupported
        ? navigator.storage.estimate().catch(() => {
            isSupported = false;
            return undefined;
          })
        : Promise.resolve(undefined),
      getResumeList().catch(() => []),
      getImageList().catch(() => [])
    ]);
  } finally {
    await minimumDelay;
    storageUsage.value = estimate?.usage || 0;
    storageQuota.value = estimate?.quota || 0;
    resumeCount.value = resumes.length;
    imageCount.value = images.length;
    storageSupported.value = isSupported;
    isRefreshingStorage.value = false;
  }
};

onMounted(async () => {
  minimapEnabled.value = getEditorMinimapEnabled();
  lineNumbersEnabled.value = getEditorLineNumbersEnabled();
  defaultFullName.value = getDefaultFullName();
  defaultPaperSize.value = getDefaultPaperSize() as PaperType;
  await refreshStorageEstimate();
});

useHead({ title: () => `${t("settings.title")} — Markdown Resume` });
</script>

<style scoped>
.settings-card {
  @apply rounded-xl border border-c bg-c p-5 shadow-sm;
}

.settings-card--menu-open {
  @apply relative z-20;
}

.settings-card-heading {
  @apply hstack gap-2 mb-5 text-lg font-bold;
}

.field-label {
  @apply block mb-2 text-sm font-bold text-c;
}

.language-menu {
  @apply relative;
}

.language-menu-trigger {
  @apply hstack w-full h-11 gap-3 rounded-lg border border-c bg-c px-3 text-sm text-dark-c outline-none transition-colors hover:bg-dark-c focus:(border-blue-400 ring-2 ring-blue-400/25) dark:focus:(border-[#007acc] ring-[#007acc]/35);
}

.language-menu-chevron {
  @apply flex-none text-light-c transition-transform duration-150;
}

.language-menu-content {
  @apply min-w-28 w-full overflow-hidden rounded-md border border-c bg-c p-1 text-sm text-c shadow-c outline-none;
  transform-origin: var(--transform-origin);
}

.language-menu-content[data-state="open"] {
  animation: language-menu-in 150ms ease-out;
}

.language-menu-content[data-state="closed"] {
  animation: language-menu-out 100ms ease-in;
}

.language-menu-item {
  @apply hstack min-h-9 gap-2 cursor-pointer select-none rounded-sm px-2 py-1.5 outline-none transition-colors hover:bg-darker-c;
}

.language-menu-item[data-highlighted] {
  @apply bg-darker-c text-dark-c;
}

@keyframes language-menu-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-0.25rem);
  }
}

@keyframes language-menu-out {
  to {
    opacity: 0;
    transform: scale(0.95) translateY(-0.25rem);
  }
}

.theme-option {
  @apply flex-center flex-col gap-2 rounded-lg border border-c px-2 py-3 text-sm hover:bg-dark-c;
}

.theme-option--active {
  @apply border-blue-400 bg-blue-50 text-blue-700 dark:(border-[#007acc] bg-[#37373d] text-[#ffffff]);
}

.editor-setting {
  @apply flex cursor-pointer items-start gap-3 rounded-lg border border-c bg-dark-c p-4 transition-colors hover:bg-darker-c;
}

.editor-settings {
  @apply grid gap-3;
}

.editor-checkbox {
  @apply mt-0.5 size-4 flex-none cursor-pointer accent-blue-500 dark:accent-[#007acc];
}

.storage-ring {
  --storage-percent: 0%;
  @apply circle flex-none size-32;
  background: conic-gradient(rgb(168 85 247) var(--storage-percent), rgb(229 231 235) 0);
}

.storage-ring--loading,
.storage-skeleton {
  @apply animate-pulse bg-gray-200 dark:bg-zinc-700;
}

.storage-ring--loading {
  background-image: none;
}

.storage-skeleton {
  @apply block rounded;
}

.storage-skeleton--label {
  @apply h-3 w-12;
}

.storage-skeleton--value {
  @apply mt-2 h-6 w-20;
}

.storage-description {
  @apply -mt-3 mb-5 text-sm leading-5 text-light-c;
}

.storage-overview {
  @apply flex flex-col items-center gap-6 sm:flex-row sm:items-stretch;
}

.storage-stats {
  @apply grid flex-1 w-full grid-cols-2 gap-4 lg:grid-cols-4;
}

.storage-unavailable {
  @apply flex max-w-40 items-center text-sm leading-5 text-light-c;
}

.storage-refresh-button {
  @apply circle ml-auto size-8 text-light-c transition-colors hover:(bg-darker-c text-dark-c) disabled:(cursor-not-allowed opacity-50);
}

:global(.dark) .storage-ring {
  background: conic-gradient(#007acc var(--storage-percent), #3f3f46 0);
}

.storage-ring-center {
  @apply circle flex-col size-25 bg-c;
}

.storage-ring-center strong {
  @apply text-xl;
}

.storage-ring-center span,
.storage-stat dt {
  @apply text-xs text-light-c;
}

.storage-stat {
  @apply rounded-lg bg-dark-c p-4;
}

.storage-stat dd {
  @apply mt-1 text-lg font-bold;
}

.danger-card {
  @apply border-red-300 dark:border-red-900/80;
}

.danger-heading {
  @apply text-red-600 dark:text-red-400;
}

.danger-description {
  @apply -mt-3 mb-5 text-sm leading-5 text-light-c;
}

.danger-button,
.danger-confirm-button {
  @apply hstack justify-center gap-2 rounded-lg border border-red-500 px-3 py-2 text-sm font-bold text-red-600 transition-colors hover:(bg-red-600 text-white) dark:(border-red-500 text-red-400) dark:hover:(bg-red-600 text-white);
}

.danger-dialog-content {
  @apply flex flex-col gap-4 border-t border-c bg-dark-c p-5 text-sm;
}

.danger-confirmation-input {
  @apply h-10 rounded-md border border-c bg-c px-3 font-mono outline-none focus:(border-red-500 ring-2 ring-red-500/20);
}

.danger-confirm-button {
  @apply self-end min-w-24 bg-red-600 text-white disabled:(cursor-not-allowed border-red-400 bg-red-400 opacity-60) dark:disabled:(border-red-900 bg-red-900 text-red-300);
}
</style>
