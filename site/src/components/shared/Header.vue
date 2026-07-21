<template>
  <header
    class="header text-c"
    :class="{
      'header--collapsed': isCollapsed,
      'header--mobile-open': isMobileOpen
    }"
  >
    <div class="mobile-header">
      <button
        class="mobile-menu-button"
        type="button"
        aria-label="Open navigation"
        :aria-expanded="isMobileOpen"
        @click="isMobileOpen = !isMobileOpen"
      >
        <span i-tabler:menu-2 text-xl />
      </button>
      <nuxt-link class="mobile-title" :to="$nuxt.$localePath('/')">
        <Logo flex-shrink-0 text-base />
        <BrandName />
      </nuxt-link>
    </div>

    <aside class="sidebar-panel">
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
            :class="
              isCollapsed
                ? 'i-tabler:layout-sidebar-left-expand'
                : 'i-tabler:layout-sidebar-left-collapse'
            "
            text-xl
          />
        </button>
      </div>

      <div v-if="$slots.middle" class="sidebar-context">
        <slot name="middle" />
      </div>

      <nav class="sidebar-nav" aria-label="Main navigation" @click="isMobileOpen = false">
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
        <NavItem
          :link="$nuxt.$localePath('/settings')"
          :label="$t('nav.settings')"
          icon="i-ic:outline-settings"
        />

        <div class="sidebar-info-group">
          <div class="sidebar-section-label sidebar-label">
            {{ $t("nav.information") }}
          </div>
          <nuxt-link
            class="sidebar-item"
            :to="$nuxt.$localePath('/about')"
            :title="isCollapsed ? $t('nav.about') : undefined"
          >
            <span i-ic:outline-info text-lg />
            <span class="sidebar-label">{{ $t("nav.about") }}</span>
          </nuxt-link>
          <nuxt-link
            class="sidebar-item"
            :to="$nuxt.$localePath('/privacy')"
            :title="isCollapsed ? $t('nav.privacy') : undefined"
          >
            <span i-mdi:shield-lock-outline text-lg />
            <span class="sidebar-label">{{ $t("nav.privacy") }}</span>
          </nuxt-link>
        </div>

        <div class="sidebar-link-group">
          <div class="sidebar-section-label sidebar-label">{{ $t("nav.links") }}</div>
          <a
            class="sidebar-item coffee-link"
            href="https://www.junian.dev/coffee/"
            target="_blank"
            rel="nofollow noopener"
            :title="isCollapsed ? $t('nav.coffee') : undefined"
          >
            <span i-twemoji:hot-beverage />
            <span class="sidebar-label">{{ $t("nav.coffee") }}</span>
          </a>
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
      </nav>
    </aside>
  </header>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    defaultCollapsed?: boolean;
  }>(),
  {
    defaultCollapsed: false
  }
);

const isCollapsed = ref(props.defaultCollapsed);
const isMobileOpen = ref(false);

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
  isCollapsed.value = savedState ? savedState === "true" : window.innerWidth < 769;
});
</script>

<style scoped>
.header {
  @apply fixed inset-y-0 left-0 z-30 w-60 transition-all duration-200;
}

.header--collapsed {
  @apply w-16;
}

.sidebar-panel {
  @apply flex flex-col size-full p-3 bg-c border-r border-c;
}

.mobile-header {
  @apply hidden;
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
  @apply flex flex-col min-h-0 gap-1 mt-7 overflow-y-auto;
}

.sidebar-info-group,
.sidebar-link-group {
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

.sidebar-context {
  @apply mt-4 overflow-hidden;
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
.header--collapsed .sidebar-nav :deep(a) {
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
  .header,
  .header.header--collapsed {
    @apply inset-x-0 top-0 bottom-auto w-full h-14 bg-c border-b border-c;
  }

  .mobile-header {
    @apply hstack h-full gap-2 px-3;
  }

  .mobile-menu-button {
    @apply circle flex-shrink-0 size-9 hover:bg-darker-c;
  }

  .mobile-title {
    @apply hstack min-w-0 gap-2 text-base text-gray-900 dark:text-gray-100;
  }

  .sidebar-panel {
    @apply hidden fixed left-0 top-14 bottom-0 w-60 h-auto shadow-xl;
  }

  .sidebar-panel .header-brand {
    @apply hidden;
  }

  .header--mobile-open .sidebar-panel {
    @apply flex;
  }

  .header--collapsed .sidebar-panel :deep(.sidebar-label) {
    @apply block;
  }

  .header--collapsed .sidebar-panel .brand-link,
  .header--collapsed .sidebar-panel .sidebar-item,
  .header--collapsed .sidebar-panel .sidebar-nav :deep(a) {
    @apply justify-start px-3;
  }
}
</style>
