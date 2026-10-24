<template>
  <div class="w-56 h-80">
    <UButton
      type="button"
      variant="ghost"
      class="resume-card group border border-c w-56 h-75 flex-center bg-darker-c hover:bg-white dark:hover:bg-[#252526] transition-all"
      :aria-label="$t('resumes.new')"
      @click="newAndSwitch"
    >
      <UIcon
        name="i-ic:round-plus"
        class="text-5xl text-light-c group-hover:text-brand"
      />
    </UButton>
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
