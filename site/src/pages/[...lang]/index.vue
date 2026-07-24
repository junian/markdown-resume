<template>
  <div class="home-page sidebar-layout">
    <Header />

    <main class="max-w-306 mx-auto px-5 py-12 md:px-10 md:py-16 text-dark-c">

      <!-- Recent Resumes Section -->
      <section class="mb-14">
        <div class="flex items-center justify-between mb-6">
          <div class="hstack gap-3">
            <span class="circle size-9 flex-shrink-0 bg-brand text-white">
              <span i-ep:document text-lg />
            </span>
            <div>
              <h2 class="text-2xl font-bold">{{ $t("resumes.my_resumes") }}</h2>
              <p class="mt-0.5 text-sm text-light-c">{{ $t("resumes.description") }}</p>
            </div>
          </div>
          <nuxt-link
            class="hstack gap-1.5 px-4 py-2 rounded-lg border border-c text-sm font-medium hover:bg-darker-c transition-colors"
            :to="$nuxt.$localePath('/resumes')"
          >
            <span>{{ $t("nav.see_more") }}</span>
            <span i-tabler:arrow-right text-base />
          </nuxt-link>
        </div>

        <div class="resumes-row-wrap">
          <div class="resumes-row">
            <NewResume />
            <ResumeItem
              v-for="resume in recentResumes"
              :key="resume.id"
              class="resume-item flex-shrink-0"
              :resume="resume"
              @update="loadResumes"
            />
          </div>
        </div>
      </section>

      <!-- Recent Images Section -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <div class="hstack gap-3">
            <span class="circle size-9 flex-shrink-0 bg-brand text-white">
              <span i-ic:outline-photo-library text-lg />
            </span>
            <div>
              <h2 class="text-2xl font-bold">{{ $t("images.my_images") }}</h2>
              <p class="mt-0.5 text-sm text-light-c">{{ $t("images.description") }}</p>
            </div>
          </div>
          <nuxt-link
            class="hstack gap-1.5 px-4 py-2 rounded-lg border border-c text-sm font-medium hover:bg-darker-c transition-colors"
            :to="$nuxt.$localePath('/images')"
          >
            <span>{{ $t("nav.see_more") }}</span>
            <span i-tabler:arrow-right text-base />
          </nuxt-link>
        </div>

        <div v-if="recentImages && recentImages.length > 0" class="images-row-wrap">
          <div class="images-row">
            <ImageItem
              v-for="image in recentImages"
              :key="image.id"
              class="flex-shrink-0"
              :image="image"
              @update="loadImages"
            />
          </div>
        </div>

        <div
          v-else-if="recentImages && recentImages.length === 0"
          class="mt-8 flex-center flex-col gap-3 text-lighter-c py-12 rounded-xl border border-dashed border-c"
        >
          <span i-ic:outline-photo-library text-5xl />
          <p text-sm>{{ $t("images.empty") }}</p>
          <nuxt-link
            class="hstack gap-1.5 px-4 py-1.5 rounded-lg bg-brand text-white text-sm hover:opacity-90 transition-opacity"
            :to="$nuxt.$localePath('/images')"
          >
            <span i-ic:round-upload-file />
            <span>{{ $t("images.upload") }}</span>
          </nuxt-link>
        </div>
      </section>

    </main>
  </div>
</template>

<script lang="ts" setup>
import type { ResumeListItem, ImageListItem } from "~/types";

const RECENT_COUNT = 5;

const resumeList = ref<ResumeListItem[]>();
const imageList = ref<ImageListItem[]>();

const recentResumes = computed(() => resumeList.value?.slice(0, RECENT_COUNT));
const recentImages = computed(() => imageList.value?.slice(0, RECENT_COUNT));

const loadResumes = async () => {
  resumeList.value = await getResumeList();
};

const loadImages = async () => {
  imageList.value = await getImageList(false);
};

onMounted(async () => {
  await Promise.all([loadResumes(), loadImages()]);
});
</script>

<style scoped>
.home-page :deep(.resume-card) {
  border-color: #d1d5db !important;
  color-scheme: light;
}

.home-page :deep(.resume-card .vue-smart-pages) {
  background-color: white !important;
  color: black !important;
}

.home-page :deep(button.resume-card) {
  background-color: #e5e7eb !important;
}

.home-page :deep(button.resume-card:hover) {
  background-color: white !important;
}

/* Wrapper allows horizontal scroll while keeping overflow-y visible so
   the translate-up hover and drop-shadow on cards are not clipped */
.resumes-row-wrap,
.images-row-wrap {
  @apply overflow-x-auto overflow-y-visible pt-3 -mt-3 pb-3 pr-3 [scrollbar-width:thin];
}

.resumes-row {
  @apply flex flex-nowrap gap-4 pr-3;
}

.images-row {
  @apply flex flex-nowrap gap-6 pr-3;
}
</style>
