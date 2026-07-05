<template>
  <div class="images-page">
    <Header />

    <div class="max-w-306 mx-auto px-5 py-16 text-dark-c">
      <!-- Page header row -->
      <div class="space-y-2 md:(hstack justify-between)">
        <h1 font-bold text-3xl>{{ $t("images.my_images") }}</h1>

        <div class="hstack space-x-2">
          <!-- Sort toggle -->
          <button
            class="rect-btn border border-dark-c hover:bg-darker-c text-sm"
            :aria-label="sortAsc ? $t('images.sort_desc') : $t('images.sort_asc')"
            @click="toggleSort"
          >
            <span :class="sortAsc ? 'i-ic:round-arrow-upward' : 'i-ic:round-arrow-downward'" text-lg />
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
    </div>
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
