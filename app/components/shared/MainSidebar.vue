<template>
  <header
    class="header text-c"
    :class="{
      'header--collapsed': isCollapsed,
      'header--mobile-open': isMobileOpen,
    }"
  >
    <div class="mobile-header">
      <UButton
        type="button"
        variant="ghost"
        color="neutral"
        class="mobile-menu-button"
        icon="i-tabler:menu-2"
        aria-label="Open navigation"
        :aria-expanded="isMobileOpen"
        @click="isMobileOpen = !isMobileOpen"
      />
      <ULink
        raw
        class="mobile-title"
        to="/"
      >
        <Logo class="shrink-0 text-base" />
        <BrandName />
      </ULink>
    </div>

    <UButton
      v-if="isMobileOpen"
      type="button"
      variant="ghost"
      class="sidebar-backdrop"
      aria-label="Close navigation"
      @click="isMobileOpen = false"
    />

    <aside class="sidebar-panel">
      <div class="header-brand">
        <ULink
          raw
          class="brand-link"
          to="/"
          :title="isCollapsed ? $t('head.title') : undefined"
        >
          <Logo
            v-show="!isCollapsed"
            class="shrink-0 text-base"
          />
          <div class="brand-title sidebar-label">
            <BrandName />
          </div>
        </ULink>

        <UButton
          type="button"
          variant="ghost"
          color="neutral"
          class="collapse-button"
          :icon="isCollapsed ? 'i-tabler:layout-sidebar-left-expand' : 'i-tabler:layout-sidebar-left-collapse'"
          :aria-label="isCollapsed ? 'Expand navigation' : 'Collapse navigation'"
          :aria-expanded="!isCollapsed"
          @click="toggleSidebar"
        />
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
        <UNavigationMenu
          as="div"
          orientation="vertical"
          color="neutral"
          :collapsed="isNavCollapsed"
          :items="navItems"
          tooltip
          :external-icon="false"
          class="flex-1 min-h-0"
          :ui="navigationMenuUi"
        />
      </nav>
    </aside>
  </header>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const props = withDefaults(
  defineProps<{
    defaultCollapsed?: boolean
  }>(),
  {
    defaultCollapsed: false,
  },
)

const { t } = useI18n()
const isMobile = useMediaQuery('(max-width: 768px)')

const isCollapsed = ref(props.defaultCollapsed)
const isMobileOpen = ref(false)

// The NavigationMenu is only collapsed on desktop; on mobile the sidebar
// drawer always renders the full labels regardless of the collapsed state.
const isNavCollapsed = computed(() => isCollapsed.value && !isMobile.value)

const navigationMenuUi = {
  label: 'px-3 pb-1 text-xs font-bold uppercase tracking-wider text-lighter-c',
  list: 'flex flex-col gap-1',
  link: 'min-h-10',
}

const externalLinks = computed(() => [
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
])

const navItems = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: t('nav.home'),
      icon: 'i-ic:outline-home',
      to: '/',
    },
    {
      label: t('resumes.my_resumes'),
      icon: 'i-ep:document',
      to: '/resumes',
    },
    {
      label: t('images.my_images'),
      icon: 'i-ic:outline-photo-library',
      to: '/images',
    },
  ],
  [
    { label: t('nav.information'), type: 'label' },
    {
      label: t('nav.about'),
      icon: 'i-ic:outline-info',
      to: '/about',
    },
    {
      label: t('nav.privacy'),
      icon: 'i-mdi:shield-lock-outline',
      to: '/privacy',
    },
  ],
  [
    { label: t('nav.links'), type: 'label' },
    ...externalLinks.value.map(link => ({
      label: link.label,
      icon: link.icon,
      href: link.href,
      target: '_blank',
      rel: link.rel,
      class: link.coffee ? 'coffee-link' : undefined,
    })),
  ],
  [
    {
      label: t('nav.settings'),
      icon: 'i-ic:outline-settings',
      to: '/settings',
    },
  ],
])

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
