<template>
  <button
    class="round-btn"
    :title="$t('toggle_dark')"
    @click="$colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'"
  >
    <UIcon
      v-show="$colorMode.preference === 'dark'"
      name="i-ph:moon-bold"
      class="text-lg"
    />
    <UIcon
      v-show="$colorMode.preference !== 'dark'"
      name="i-ph:sun-bold"
      class="text-lg"
    />
  </button>
</template>
