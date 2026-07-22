<template>
  <div class="images-page sidebar-layout">
    <Header />

    <main class="max-w-306 mx-auto px-5 py-12 md:px-10 md:py-16 text-dark-c">
      <!-- Page header row -->
      <div
        class="flex flex-col gap-4 mb-10 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="hstack gap-3">
          <span class="circle size-10 flex-shrink-0 bg-brand text-white">
            <span i-ic:outline-photo-library text-xl />
          </span>
          <div>
            <h1 class="text-3xl font-bold">{{ $t("images.my_images") }}</h1>
            <p class="mt-1 text-sm text-light-c">{{ $t("images.description") }}</p>
          </div>
        </div>

        <div class="hstack space-x-2">
          <!-- Sort toggle -->
          <button
            class="rect-btn border border-dark-c hover:bg-darker-c text-sm"
            :aria-label="sortAsc ? $t('images.sort_desc') : $t('images.sort_asc')"
            @click="toggleSort"
          >
            <span
              :class="sortAsc ? 'i-ic:round-arrow-upward' : 'i-ic:round-arrow-downward'"
              text-lg
            />
            <span>{{ sortAsc ? $t("images.sort_asc") : $t("images.sort_desc") }}</span>
          </button>

          <!-- Upload button -->
          <button
            class="rect-btn border border-dark-c hover:bg-darker-c text-sm"
            :aria-label="$t('images.upload')"
            @click="showUpload = !showUpload"
          >
            <span i-ic:round-upload-file text-lg />
            <span>{{ $t("images.upload") }}</span>
          </button>
        </div>
      </div>

      <!-- Inline upload dropzone (collapsible) -->
      <div v-if="showUpload" class="mt-4">
        <ImageUpload @uploaded="onUploaded" />
      </div>

      <!-- Gallery grid -->
      <div v-if="list && list.length > 0" class="flex flex-wrap gap-x-6 gap-y-8 mt-8">
        <ImageItem
          v-for="image in list"
          :key="image.id"
          :image="image"
          @update="loadImages"
        />
      </div>

      <!-- Empty state -->
      <div
        v-else-if="list && list.length === 0"
        class="mt-16 flex-center flex-col gap-3 text-lighter-c"
      >
        <span i-ic:outline-photo-library text-5xl />
        <p text-sm>{{ $t("images.empty") }}</p>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import type { ImageListItem } from "~/types";

const list = ref<ImageListItem[]>();
const sortAsc = ref(false);
const showUpload = ref(false);

const loadImages = async () => {
  list.value = await getImageList(sortAsc.value);
};

const toggleSort = async () => {
  sortAsc.value = !sortAsc.value;
  await loadImages();
};

const onUploaded = async () => {
  await loadImages();
  showUpload.value = false;
};

onMounted(loadImages);
</script>
