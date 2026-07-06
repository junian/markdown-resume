<template>
  <div v-if="shortname">
    <div v-if="!loaded" class="flex justify-center">
      <button
        class="text-white bg-brand rounded-lg duration-200 outline outline-4 outline-transparent hover:outline-rose-300/50 hstack space-x-1.5"
        p="x-4 y-3"
        @click="load"
      >
        <span i-ic:outline-comment />
        <span>{{ $t('disqus.leave_a_comment') }}</span>
      </button>
    </div>

    <div v-else>
      <div id="disqus_thread" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const shortname = config.public.disqusShortname as string;

const loaded = ref(false);

function load() {
  loaded.value = true;

  nextTick(() => {
    // Set up Disqus config
    (window as any).disqus_config = function (this: any) {
      this.page.url = window.location.href;
      this.page.identifier = window.location.pathname;
    };

    const script = document.createElement('script');
    script.src = `https://${shortname}.disqus.com/embed.js`;
    script.setAttribute('data-timestamp', String(Date.now()));
    script.async = true;
    document.head.appendChild(script);
  });
}
</script>
