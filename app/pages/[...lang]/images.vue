<template>
  <div class="images-page sidebar-layout">
    <MainSidebar />

    <main class="max-w-306 mx-auto px-5 py-12 md:px-10 md:py-16 text-dark-c">
      <!-- Page header row -->
      <div
        class="flex flex-col gap-4 mb-10 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="hstack gap-3">
          <span class="circle size-10 shrink-0 bg-brand text-white">
            <UIcon
              name="i-ic:outline-photo-library"
              class="text-xl"
            />
          </span>
          <div>
            <h1 class="text-3xl font-bold">
              {{ $t("images.my_images") }}
            </h1>
            <p class="mt-1 text-sm text-light-c">
              {{ $t("images.description") }}
            </p>
          </div>
        </div>

        <UButton
          variant="outline"
          color="neutral"
          :icon="sortAsc ? 'i-ic:round-arrow-upward' : 'i-ic:round-arrow-downward'"
          :aria-label="sortAsc ? $t('images.sort_desc') : $t('images.sort_asc')"
          @click="toggleSort"
        >
          {{ sortAsc ? $t("images.sort_asc") : $t("images.sort_desc") }}
        </UButton>
      </div>

      <!-- Gallery grid -->
      <div class="grid justify-between gap-x-6 gap-y-8 mt-8 grid-cols-[repeat(auto-fill,13rem)]">
        <ImageUpload @uploaded="loadImages" />
        <ImageItem
          v-for="image in list ?? []"
          :key="image.id"
          :image="image"
          @update="loadImages"
        />
      </div>

      <!-- Empty state -->
      <div
        v-if="list && list.length === 0"
        class="mt-16 flex-center flex-col gap-3 text-lighter-c"
      >
        <UIcon
          name="i-ic:outline-photo-library"
          class="text-5xl"
        />
        <p class="text-sm">
          {{ $t("images.empty") }}
        </p>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import type { ImageListItem } from '~/types'

const list = ref<ImageListItem[]>()
const sortAsc = ref(false)

const loadImages = async () => {
  list.value = await getImageList(sortAsc.value)
}

const toggleSort = async () => {
  sortAsc.value = !sortAsc.value
  await loadImages()
}

onMounted(loadImages)
</script>
