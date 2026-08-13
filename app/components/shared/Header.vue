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
            class="sidebar-item coffee-link"
            href="https://www.junian.dev/coffee/"
            target="_blank"
            rel="nofollow noopener"
            :title="isCollapsed ? $t('nav.coffee') : undefined"
          >
            <UIcon
              name="i-twemoji:hot-beverage"
              class="text-lg"
            />
            <span class="sidebar-label">{{ $t("nav.coffee") }}</span>
          </a>
          <a
            class="sidebar-item"
            href="https://github.com/junian/markdown-resume/"
            target="_blank"
            rel="nofollow noopener"
            title="GitHub"
          >
            <UIcon
              name="i-tabler:brand-github"
              class="text-lg"
            />
            <span class="sidebar-label">GitHub</span>
          </a>
          <a
            class="sidebar-item"
            href="https://www.junian.dev/"
            target="_blank"
            rel="dofollow"
            title="Junian.dev"
          >
            <UIcon
              name="i-tabler:world"
              class="text-lg"
            />
            <span class="sidebar-label">Junian.dev</span>
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

const isCollapsed = ref(props.defaultCollapsed)
const isMobileOpen = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem('navigation-collapsed', String(isCollapsed.value))
}

onMounted(() => {
  if (props.defaultCollapsed) {
    isCollapsed.value = true
    return
  }

  const savedState = localStorage.getItem('navigation-collapsed')
  isCollapsed.value = savedState ? savedState === 'true' : window.innerWidth < 769
})
</script>
