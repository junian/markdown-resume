<template>
  <div class="w-56 h-80">
    <button
      class="resume-card group w-[210px] h-[299px] flex-center bg-darker-c hover:bg-c"
      :aria-label="$t('resumes.new')"
      @click="newAndSwitch"
    >
      <UIcon name="i-ic:round-plus" class="text-5xl text-light-c group-hover:text-brand" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const localePath = useLocalePath()

const newAndSwitch = async () => {
  const id = await newResume()
  router.push(localePath(`/edit/${id}`))
}
</script>
