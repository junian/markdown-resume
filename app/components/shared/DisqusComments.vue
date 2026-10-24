<template>
  <div v-if="shortname">
    <div
      v-if="!loaded"
      class="flex justify-center"
    >
      <UButton
        variant="ghost"
        class="text-white bg-brand rounded-lg px-4 py-3 duration-200 outline-4 outline-transparent hover:bg-blue-500 dark:hover:bg-[#007acc] hover:outline-rose-300/50"
        icon="i-ic:outline-comment"
        @click="load"
      >
        {{ $t('disqus.leave_a_comment') }}
      </UButton>
    </div>

    <div v-else>
      <div id="disqus_thread" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const shortname = config.public.disqusShortname as string

const loaded = ref(false)

function load() {
  loaded.value = true

  nextTick(() => {
    // Set up Disqus config
    interface DisqusConfig {
      page: {
        url: string
        identifier: string
      }
    }

    const windowWithDisqus = window as unknown as {
      disqus_config?: (this: DisqusConfig) => void
    }
    windowWithDisqus.disqus_config = function (this: DisqusConfig) {
      this.page.url = window.location.href
      this.page.identifier = window.location.pathname
    }

    const script = document.createElement('script')
    script.src = `https://${shortname}.disqus.com/embed.js`
    script.setAttribute('data-timestamp', String(Date.now()))
    script.async = true
    document.head.appendChild(script)
  })
}
</script>
