<template>
  <div class="resumes-page sidebar-layout">
    <Header />

    <main class="max-w-306 mx-auto px-5 py-12 md:px-10 md:py-16 text-dark-c">
      <div
        class="flex flex-col gap-4 mb-10 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="hstack gap-3">
          <span class="circle size-10 flex-shrink-0 bg-brand text-white">
            <span i-ep:document text-xl />
          </span>
          <div>
            <h1 class="text-3xl font-bold">{{ $t("resumes.my_resumes") }}</h1>
            <p class="mt-1 text-sm text-light-c">{{ $t("resumes.description") }}</p>
          </div>
        </div>
        <FileOptions @update="loadResumes" />
      </div>

      <div class="flex flex-wrap gap-x-4 gap-y-8">
        <NewResume />
        <ResumeItem
          v-for="resume in list"
          :key="resume.id"
          class="resume-item"
          :resume="resume"
          @update="loadResumes"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import type { ResumeListItem } from "~/types";

// Load resumes from storage
const list = ref<ResumeListItem[]>();

const loadResumes = async () => {
  list.value = await getResumeList();
};

onMounted(loadResumes);
</script>

<style scoped>
.resumes-page :deep(.resume-card) {
  border-color: #d1d5db !important;
  color-scheme: light;
}

.resumes-page :deep(.resume-card .vue-smart-pages) {
  background-color: white !important;
  color: black !important;
}

.resumes-page :deep(button.resume-card) {
  background-color: #e5e7eb !important;
}

.resumes-page :deep(button.resume-card:hover) {
  background-color: white !important;
}
</style>
