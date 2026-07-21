<template>
  <header
    class="header text-c"
    :class="{ 'header--collapsed': isCollapsed }"
  >
    <div class="header-brand">
      <nuxt-link
        class="brand-link"
        :to="$nuxt.$localePath('/')"
        :title="isCollapsed ? $t('head.title') : undefined"
      >
        <Logo class="flex-shrink-0" text="base" />
        <div class="brand-title sidebar-label"><BrandName /></div>
      </nuxt-link>

      <button
        class="collapse-button"
        type="button"
        :aria-label="isCollapsed ? 'Expand navigation' : 'Collapse navigation'"
        :aria-expanded="!isCollapsed"
        @click="toggleSidebar"
      >
        <span
          :class="isCollapsed ? 'i-tabler:layout-sidebar-left-expand' : 'i-tabler:layout-sidebar-left-collapse'"
          text-xl
        />
      </button>
    </div>

    <div v-if="$slots.middle" class="sidebar-context">
      <slot name="middle" />
    </div>

    <nav class="sidebar-nav" aria-label="Main navigation">
      <NavItem
        :link="$nuxt.$localePath('/')"
        :label="$t('resumes.my_resumes')"
        icon="i-ep:document"
      />
      <NavItem
        :link="$nuxt.$localePath('/images')"
        :label="$t('images.my_images')"
        icon="i-ic:outline-photo-library"
      />

      <div class="sidebar-info-group">
        <div class="sidebar-section-label sidebar-label">{{ $t('nav.information') }}</div>
        <nuxt-link
          class="sidebar-item"
          :to="$nuxt.$localePath('/about')"
          :title="isCollapsed ? $t('nav.about') : undefined"
        >
          <span i-ic:outline-info text-lg />
          <span class="sidebar-label">{{ $t('nav.about') }}</span>
        </nuxt-link>
        <nuxt-link
          class="sidebar-item"
          :to="$nuxt.$localePath('/privacy')"
          :title="isCollapsed ? $t('nav.privacy') : undefined"
        >
          <span i-mdi:shield-lock-outline text-lg />
          <span class="sidebar-label">{{ $t('nav.privacy') }}</span>
        </nuxt-link>
      </div>
    </nav>

    <div class="sidebar-footer">
      <a
        class="sidebar-item coffee-link"
        href="https://www.junian.dev/coffee/"
        target="_blank"
        rel="nofollow noopener"
        :title="isCollapsed ? $t('nav.coffee') : undefined"
      >
        <span i-twemoji:hot-beverage />
        <span class="sidebar-label">{{ $t('nav.coffee') }}</span>
      </a>

      <div class="sidebar-item sidebar-language">
        <ToggleLang />
      </div>

      <slot name="tail" />

      <a
        class="sidebar-item"
        href="https://github.com/junian/markdown-resume/"
        target="_blank"
        rel="nofollow noopener"
        title="GitHub"
      >
        <span i-tabler:brand-github text-lg />
        <span class="sidebar-label">GitHub</span>
      </a>
      <a
        class="sidebar-item"
        href="https://www.junian.dev/"
        target="_blank"
        rel="dofollow"
        title="Junian.dev"
      >
        <span i-tabler:world text-lg />
        <span class="sidebar-label">Junian.dev</span>
      </a>
    </div>
  </header>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  defaultCollapsed?: boolean;
}>(), {
  defaultCollapsed: false
});

const isCollapsed = ref(props.defaultCollapsed);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem("navigation-collapsed", String(isCollapsed.value));
};

onMounted(() => {
  if (props.defaultCollapsed) {
    isCollapsed.value = true;
    return;
  }

  const savedState = localStorage.getItem("navigation-collapsed");
  isCollapsed.value = savedState
    ? savedState === "true"
    : window.innerWidth < 769;
});
</script>

<style scoped>
.header {
  @apply fixed inset-y-0 left-0 z-30 flex flex-col w-60 p-3 bg-c border-r border-c transition-all duration-200;
}

.header--collapsed {
  @apply w-16;
}

.header-brand {
  @apply hstack min-h-10 gap-1;
}

.brand-link,
.sidebar-item {
  @apply hstack min-w-0 gap-3 rounded-lg transition-colors hover:bg-darker-c;
}

.brand-link {
  @apply flex-1 gap-2 px-1 py-1 overflow-hidden text-gray-900 dark:text-gray-100;
}

.brand-title {
  @apply min-w-0 truncate text-base;
}

.collapse-button {
  @apply circle flex-shrink-0 size-8 hover:bg-darker-c;
}

.sidebar-nav {
  @apply flex flex-col gap-1 mt-7;
}

.sidebar-info-group {
  @apply flex flex-col gap-1 mt-4 pt-3 border-t border-c;
}

.sidebar-section-label {
  @apply px-3 pb-1 text-xs font-bold uppercase tracking-wider text-lighter-c;
}

.sidebar-nav :deep(a),
.sidebar-item {
  @apply min-h-10 px-3;
}

.sidebar-nav :deep(a) {
  @apply gap-3 rounded-lg;
}

.sidebar-footer {
  @apply flex flex-col gap-1 mt-auto;
}

.sidebar-context {
  @apply mt-4 overflow-hidden;
}

.sidebar-language {
  @apply p-0;
}

.sidebar-language :deep(button) {
  @apply w-full min-h-10 px-3 gap-3;
}

.coffee-link {
  @apply text-gray-900 bg-yellow-400 hover:bg-yellow-300;
}

.sidebar-label {
  @apply whitespace-nowrap transition-opacity duration-150;
}

.header--collapsed :deep(.sidebar-label),
.header--collapsed :deep(.hide-on-mobile) {
  @apply hidden;
}

.header--collapsed .brand-link,
.header--collapsed .sidebar-item,
.header--collapsed .sidebar-nav :deep(a),
.header--collapsed .sidebar-language :deep(button) {
  @apply justify-center px-0;
}

.header--collapsed .header-brand {
  @apply flex-col;
}

.header--collapsed .collapse-button {
  @apply order-first mb-1;
}

.sidebar-nav :deep(a.router-link-active),
a.router-link-active.sidebar-item {
  @apply bg-darker-c font-bold;
}

@media (max-width: 768px) {
  .header:not(.header--collapsed) {
    @apply shadow-xl;
  }
}
</style>
