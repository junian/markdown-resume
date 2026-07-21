<template>
  <div class="privacy-page">
    <Header />

    <main class="max-w-210 mx-auto px-5 py-12 md:px-10 md:py-16 text-dark-c">
      <div class="mb-10">
        <div class="hstack gap-3 mb-3">
          <span class="circle size-10 bg-brand text-white">
            <span i-mdi:shield-lock-outline text-xl />
          </span>
          <h1 class="text-3xl font-bold">Privacy Policy</h1>
        </div>
        <p class="text-sm text-light-c">Last updated: July 21, 2026</p>
      </div>

      <div class="privacy-content">
        <p>
          Markdown Resume is designed as a <strong>local-first application</strong>.
          You can create and manage your résumés without creating an account or
          sending your personal content to an application server.
        </p>

        <section>
          <h2>Résumé and image data</h2>
          <p>
            Your résumé content, document settings, and uploaded images are stored
            locally in your browser using <strong>IndexedDB</strong>. This information
            stays on your device. It is not uploaded to, processed by, or saved on
            our servers.
          </p>
          <p>
            Because the data is local to your browser, clearing site data, using a
            different browser or device, or removing the browser profile may make it
            unavailable. Use the available export and backup features to keep copies
            of information you do not want to lose.
          </p>
        </section>

        <section>
          <h2>Analytics</h2>
          <p>
            When you use the hosted website, we use <strong>Cloudflare Web
            Analytics</strong> and <strong>Google Analytics</strong> to understand
            aggregate usage, including metrics such as page views, active users,
            device or browser categories, and general interaction patterns. These
            measurements help us understand how the application is used and improve it.
          </p>
          <p>
            The analytics services may process technical information such as an IP
            address, browser and device information, referring pages, and analytics
            identifiers according to their own privacy practices. Your résumé text,
            document settings, and uploaded images are not included in analytics events.
          </p>
        </section>

        <section>
          <h2>Data sharing</h2>
          <p>
            We do not sell your personal information. Résumé and image data stored by
            this app are not shared with third parties because they remain in your
            browser. Analytics information is processed by Cloudflare and Google only
            for the measurement purposes described above.
          </p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>
            We may update this policy when the application or its analytics setup
            changes. The latest version and its revision date will be published on
            this page.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For questions about this privacy policy, visit
            <a href="https://www.junian.dev/" target="_blank" rel="noopener">Junian.dev</a>.
          </p>
        </section>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
useHead({ title: "Privacy Policy — Markdown Resume" });
</script>

<style scoped>
.privacy-content {
  @apply space-y-8 leading-7 text-gray-700 dark:text-gray-200;
}

.privacy-content section {
  @apply space-y-3;
}

.privacy-content h2 {
  @apply text-xl font-bold text-black dark:text-white;
}

.privacy-content a {
  @apply text-brand underline underline-offset-2;
}
</style>
