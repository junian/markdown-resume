<template>
  <div>
    <div w-56 h-80>
      <div
        class="resume-card group relative overflow-hidden border border-c"
        :style="{
          width: `${width}px`,
          height: `${height}px`
        }"
      >
        <div
          v-if="!isRendered"
          class="resume-placeholder"
          role="status"
          aria-label="Rendering resume preview"
        >
          <div class="placeholder-heading" />
          <div class="placeholder-line placeholder-line--short" />
          <div class="placeholder-block" />
          <div class="placeholder-line" />
          <div class="placeholder-line" />
          <div class="placeholder-line placeholder-line--medium" />
          <span class="sr-only">Rendering resume preview</span>
        </div>

        <nuxt-link
          class="resume-preview"
          :class="{ 'resume-preview--ready': isRendered }"
          :to="$nuxt.$localePath(`/edit/${props.resume.id}`)"
        >
          <ResumeRender
            :id="resume.id"
            ref="render"
            :markdown="resume.markdown"
            :styles="resume.styles"
            :style="{
              transform: `scale(${1 / MM_TO_PX})`
            }"
            class="origin-top-left"
            @rendered="revealThumbnail"
          />
        </nuxt-link>
        <ResumeOptions
          class="group-hover:block hidden"
          :resume="resume"
          @update="emit('update')"
        />
      </div>
    </div>

    <ResumeInfo :resume="resume" @update="emit('update')" />
  </div>
</template>

<script lang="ts" setup>
import type { ResumeListItem } from "~/types";

const props = defineProps<{
  resume: ResumeListItem;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const width = PAPER[props.resume.styles.paper].w;
const height = PAPER[props.resume.styles.paper].h;

const render = ref();
const isRendered = ref(false);
const MINIMUM_PLACEHOLDER_DURATION = 800;
const placeholderStartedAt = Date.now();
let revealTimer: ReturnType<typeof setTimeout> | undefined;

const revealThumbnail = () => {
  if (isRendered.value || revealTimer) return;

  const remaining = Math.max(
    0,
    MINIMUM_PLACEHOLDER_DURATION - (Date.now() - placeholderStartedAt)
  );
  revealTimer = setTimeout(() => {
    isRendered.value = true;
    revealTimer = undefined;
  }, remaining);
};

const updateResumeItem = async () => {
  // set resume backbone styles
  setBackboneCss(props.resume.css, props.resume.id);
  // load Google fonts
  await resolveGoogleFont(props.resume.styles.fontEN);
  await resolveGoogleFont(props.resume.styles.fontCJK);
  // set resume dynamic styles
  setDynamicCss(props.resume.styles, props.resume.id);
  // force update SmartPage
  render.value.forceUpdate();
};

onMounted(updateResumeItem);
onUpdated(updateResumeItem);
onBeforeUnmount(() => clearTimeout(revealTimer));
</script>

<style scoped>
.resume-preview {
  @apply block size-full opacity-0;
  transition: opacity 280ms ease;
}

.resume-preview--ready {
  @apply opacity-100;
}

.resume-placeholder {
  @apply absolute inset-0 z-10 flex flex-col gap-3 bg-white p-6 overflow-hidden;
}

.resume-placeholder::after {
  content: "";
  @apply absolute inset-0;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgb(255 255 255 / 75%) 45%,
    transparent 60%
  );
  transform: translateX(-100%);
  animation: resume-shimmer 1.35s ease-in-out infinite;
}

.placeholder-heading,
.placeholder-line,
.placeholder-block {
  @apply rounded bg-gray-200;
}

.placeholder-heading {
  @apply w-3/5 h-5;
}

.placeholder-line {
  @apply w-full h-2;
}

.placeholder-line--short {
  @apply w-2/5;
}

.placeholder-line--medium {
  @apply w-4/5;
}

.placeholder-block {
  @apply w-full h-16 my-2;
}

@keyframes resume-shimmer {
  to {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .resume-placeholder::after {
    animation: none;
  }

  .resume-preview {
    transition: none;
  }
}
</style>
