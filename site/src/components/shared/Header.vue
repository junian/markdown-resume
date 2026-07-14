<template>
  <header class="header hstack justify-between pl-4 pr-1 text-c">
    <div class="hstack space-x-2">
      <a
        href="https://www.junian.dev/"
        target="_blank"
        rel="dofollow"
        class="circle size-9 md:size-10 flex-shrink-0 bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm"
        aria-label="Junian.dev"
      >
        <span class="i-ic:outline-home text-lg md:text-xl" />
      </a>

      <nuxt-link
        class="hstack space-x-2 cursor-pointer text-gray-900 dark:text-gray-100"
        :to="$nuxt.$localePath('/')"
      >
        <Logo hide-on-mobile text="sm md:base" />
        <div text="base md:lg"><BrandName /></div>
      </nuxt-link>
    </div>

    <slot name="middle" />

    <div hstack>
      <NavItem
        mr-1
        :link="$nuxt.$localePath('/')"
        :label="$t('resumes.my_resumes')"
        icon="i-ep:document"
      />
      <NavItem
        mr-3
        :link="$nuxt.$localePath('/images')"
        :label="$t('images.my_images')"
        icon="i-ic:outline-photo-library"
      />
      <a
        class="hstack space-x-1.5 mr-3 px-3 py-1.5 rounded-full text-sm font-bold bg-yellow-400 hover:bg-yellow-300 text-gray-900 transition-colors"
        href="https://www.junian.dev/coffee/"
        target="_blank"
        rel="nofollow noopener"
      >
        <span i-twemoji:hot-beverage />
        <span class="hide-on-mobile">{{ $t('nav.coffee') }}</span>
      </a>
      <ToggleLang mr-1.5 />

      <slot name="tail" />

      <!--
      <ToggleDark />
      -->
      <nuxt-link
        class="round-btn"
        :to="$nuxt.$localePath('/about')"
        :aria-label="$t('nav.about')"
      >
        <span i-ic:outline-info md:text-lg />
      </nuxt-link>
      <a
        class="round-btn"
        href="https://github.com/junian/markdown-resume/"
        target="_blank"
        rel="nofollow noopener"
      >
        <span i-tabler:brand-github md:text-lg />
      </a>
    </div>
  </header>
</template>

<style scoped>
a.router-link-active.round-btn,
a.router-link-exact-active.round-btn {
  background-color: rgb(229 231 235); /* gray-200 */
}

:global(.dark) a.router-link-active.round-btn,
:global(.dark) a.router-link-exact-active.round-btn {
  background-color: rgb(55 65 81); /* gray-700 */
}
</style>
