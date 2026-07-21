<template>
  <button class="round-btn flex-shrink-0" :aria-label="$t('resumes.save')" :title="$t('resumes.save')" @click="save">
    <span i-ic:baseline-save md:text-lg />
  </button>
</template>

<script lang="ts" setup>
import { useShortcuts } from "@renovamen/vue-shortcuts";
const save = () => saveCurrentResume();

useShortcuts("ctrl+s", save);
</script>
