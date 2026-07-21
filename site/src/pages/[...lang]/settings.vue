<template>
  <div class="settings-page">
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
        <section class="settings-card">
          <div class="settings-card-heading">
            <span i-ic:round-translate text-xl />
            <h2>{{ $t("settings.language") }}</h2>
          </div>
          <label class="field-label" for="settings-language">{{
            $t("settings.language_label")
          }}</label>
          <select
            id="settings-language"
            class="settings-select"
            :value="locale"
            @change="changeLanguage"
          >
            <option v-for="item in locales" :key="item.code" :value="item.code">
              {{ item.name }}
            </option>
          </select>
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
            <span i-mdi:database-outline text-xl />
            <h2>{{ $t("settings.storage") }}</h2>
          </div>

          <div
            v-if="storageSupported"
            class="flex flex-col items-center gap-8 sm:flex-row"
          >
            <div
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

            <dl class="grid flex-1 w-full grid-cols-2 gap-4">
              <div class="storage-stat">
                <dt>{{ $t("settings.usage") }}</dt>
                <dd>{{ formatBytes(storageUsage) }}</dd>
              </div>
              <div class="storage-stat">
                <dt>{{ $t("settings.quota") }}</dt>
                <dd>{{ formatBytes(storageQuota) }}</dd>
              </div>
            </dl>
          </div>
          <p v-else class="text-sm text-light-c">
            {{ $t("settings.storage_unavailable") }}
          </p>
        </section>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
const { t, locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const themeModes = computed(() => [
  { value: "light", label: t("settings.light"), icon: "i-ph:sun-bold" },
  { value: "dark", label: t("settings.dark"), icon: "i-ph:moon-bold" },
  { value: "system", label: t("settings.auto"), icon: "i-ph:desktop-bold" }
]);

const changeLanguage = async (event: Event) => {
  const target = event.target as HTMLSelectElement;
  await navigateTo(switchLocalePath(target.value));
};

const storageSupported = ref(true);
const storageUsage = ref(0);
const storageQuota = ref(0);
const storagePercent = computed(() =>
  storageQuota.value ? Math.min(100, (storageUsage.value / storageQuota.value) * 100) : 0
);
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

onMounted(async () => {
  if (!navigator.storage?.estimate) {
    storageSupported.value = false;
    return;
  }

  try {
    const estimate = await navigator.storage.estimate();
    storageUsage.value = estimate.usage || 0;
    storageQuota.value = estimate.quota || 0;
  } catch {
    storageSupported.value = false;
  }
});

useHead({ title: () => `${t("settings.title")} — Markdown Resume` });
</script>

<style scoped>
.settings-card {
  @apply rounded-xl border border-c bg-c p-5 shadow-sm;
}

.settings-card-heading {
  @apply hstack gap-2 mb-5 text-lg font-bold;
}

.field-label {
  @apply block mb-2 text-sm font-bold text-c;
}

.settings-select {
  @apply w-full rounded-lg border border-c bg-c px-3 py-2.5 outline-none focus:border-purple-400 dark:focus:border-[#007acc];
}

.theme-option {
  @apply flex-center flex-col gap-2 rounded-lg border border-c px-2 py-3 text-sm hover:bg-dark-c;
}

.theme-option--active {
  @apply border-purple-400 bg-purple-50 text-purple-700 dark:(border-[#007acc] bg-[#37373d] text-[#ffffff]);
}

.storage-ring {
  --storage-percent: 0%;
  @apply circle flex-none size-32;
  background: conic-gradient(rgb(168 85 247) var(--storage-percent), rgb(229 231 235) 0);
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
</style>
