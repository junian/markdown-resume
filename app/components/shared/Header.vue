<template>
  <header
    class="header text-c"
    :class="{
      'header--collapsed': isCollapsed,
      'header--mobile-open': isMobileOpen,
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
        <UIcon
          name="i-tabler:menu-2"
          class="text-xl"
        />
      </button>
      <nuxt-link
        class="mobile-title"
        :to="$nuxt.$localePath('/')"
      >
        <Logo class="flex-shrink-0 text-base" />
        <BrandName />
      </nuxt-link>
    </div>

    <button
      v-if="isMobileOpen"
      class="sidebar-backdrop"
      type="button"
      aria-label="Close navigation"
      @click="isMobileOpen = false"
    />

    <aside class="sidebar-panel">
      <div class="header-brand">
        <nuxt-link
          class="brand-link"
          :to="$nuxt.$localePath('/')"
          :title="isCollapsed ? $t('head.title') : undefined"
        >
          <Logo
            v-show="!isCollapsed"
            class="flex-shrink-0 text-base"
          />
          <div class="brand-title sidebar-label">
            <BrandName />
          </div>
        </nuxt-link>

        <button
          class="collapse-button"
          type="button"
          :aria-label="isCollapsed ? 'Expand navigation' : 'Collapse navigation'"
          :aria-expanded="!isCollapsed"
          @click="toggleSidebar"
        >
          <UIcon
            :name="isCollapsed ? 'i-tabler:layout-sidebar-left-expand' : 'i-tabler:layout-sidebar-left-collapse'"
            class="text-xl"
          />
        </button>
      </div>

      <div
        v-if="$slots.middle"
        class="sidebar-context"
      >
        <slot name="middle" />
      </div>

      <nav
        class="sidebar-nav"
        aria-label="Main navigation"
        @click="isMobileOpen = false"
      >
        <NavItem
          :link="$nuxt.$localePath('/')"
          :label="$t('nav.home')"
          icon="i-ic:outline-home"
        />
        <NavItem
          :link="$nuxt.$localePath('/resumes')"
          :label="$t('resumes.my_resumes')"
          icon="i-ep:document"
        />
        <NavItem
          :link="$nuxt.$localePath('/images')"
          :label="$t('images.my_images')"
          icon="i-ic:outline-photo-library"
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
            <UIcon
              name="i-ic:outline-info"
              class="text-lg"
            />
            <span class="sidebar-label">{{ $t("nav.about") }}</span>
          </nuxt-link>
          <nuxt-link
            class="sidebar-item"
            :to="$nuxt.$localePath('/privacy')"
            :title="isCollapsed ? $t('nav.privacy') : undefined"
          >
            <UIcon
              name="i-mdi:shield-lock-outline"
              class="text-lg"
            />
            <span class="sidebar-label">{{ $t("nav.privacy") }}</span>
          </nuxt-link>
        </div>

        <div class="sidebar-link-group">
          <div class="sidebar-section-label sidebar-label">
            {{ $t("nav.links") }}
          </div>
          <a
            v-for="link in externalLinks"
            :key="link.href"
            class="sidebar-item"
            :class="{ 'coffee-link': link.coffee }"
            :href="link.href"
            target="_blank"
            :rel="link.rel"
            :title="isCollapsed ? link.label : undefined"
          >
            <UIcon
              :name="link.icon"
              class="text-lg"
            />
            <span class="sidebar-label">{{ link.label }}</span>
          </a>
        </div>

        <div class="sidebar-settings">
          <NavItem
            :link="$nuxt.$localePath('/settings')"
            :label="$t('nav.settings')"
            icon="i-ic:outline-settings"
          />
        </div>
      </nav>
    </aside>
  </header>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    defaultCollapsed?: boolean
  }>(),
  {
    defaultCollapsed: false,
  },
)

const { t } = useI18n()

const isCollapsed = ref(props.defaultCollapsed)
const isMobileOpen = ref(false)

const externalLinks = [
  {
    href: 'https://www.junian.dev/coffee/',
    rel: 'nofollow noopener',
    icon: 'i-twemoji:hot-beverage',
    label: t('nav.coffee'),
    coffee: true,
  },
  {
    href: 'https://github.com/junian/markdown-resume/',
    rel: 'nofollow noopener',
    icon: 'i-tabler:brand-github',
    label: 'GitHub',
  },
  {
    href: 'https://www.junian.dev/',
    rel: 'dofollow',
    icon: 'i-tabler:world',
    label: 'Junian.dev',
  },
]

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem(NAVIGATION_COLLAPSED_STORAGE_KEY, String(isCollapsed.value))
}

onMounted(() => {
  if (props.defaultCollapsed) {
    isCollapsed.value = true
    return
  }

  const savedState = localStorage.getItem(NAVIGATION_COLLAPSED_STORAGE_KEY)
  isCollapsed.value = savedState ? savedState === 'true' : window.innerWidth < 769
})
</script>
