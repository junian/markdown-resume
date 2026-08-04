<template>
  <div class="about-page sidebar-layout">
    <Header />

    <main class="max-w-210 mx-auto px-5 py-12 md:px-10 md:py-16 text-dark-c">
      <div class="mb-10">
        <div class="hstack gap-3 mb-3">
          <span class="circle size-10 bg-brand text-white">
            <span i-mdi:information-outline text-xl />
          </span>
          <h1 class="text-3xl font-bold">About</h1>
        </div>
        <p class="text-sm text-light-c">Last updated: July 24, 2026</p>
      </div>

      <div class="about-content">
        <p>
          Welcome to <strong>Markdown Resume</strong> — your companion for crafting professional resumes.
          We believe that creating a resume should be simple, powerful, and secure. That's why we built
          this tool to help you manage your resumes with full control over your data privacy.
        </p>

        <section>
          <h2>Why Markdown Resume?</h2>
          <p>
            Markdown Resume is designed as a <strong>local-first application</strong>, meaning your resumes, images,
            and all personal data stay right where they belong — on your device. No cloud storage,
            no data mining, and your sensitive content is never transmitted. Just you and your resume.
          </p>
          <p>
            Whether you're a developer who loves Markdown, a creative professional who needs flexibility, or someone
            who simply wants full control over their job application materials, Markdown Resume gives you the tools to
            create stunning resumes that stand out.
          </p>
        </section>

        <section>
          <h2>Powerful Features</h2>
          <p>
            Don't let the simplicity fool you — Markdown Resume packs powerful features to help you create the perfect resume:
          </p>
          <ul>
            <li><strong>Multiple Resumes</strong> — Create and manage different resumes for different job applications</li>
            <li><strong>Real-time Preview</strong> — See changes instantly as you edit with live preview</li>
            <li><strong>Multiple Export Formats</strong> — Export to PDF, HTML, or MS Word (beta)</li>
            <li><strong>Image Gallery</strong> — Upload and manage your profile pictures and assets</li>
            <li><strong>Full Customization</strong> — Pick fonts, add icons, and style your resume exactly how you want</li>
            <li><strong>Math Support</strong> — Include mathematical expressions using KaTeX</li>
            <li><strong>Dark Mode</strong> — Comfortable editing in any lighting condition</li>
            <li><strong>Offline Ready</strong> — Works offline with PWA support</li>
          </ul>
        </section>

        <section>
          <h2>Privacy & Security</h2>
          <p>
            We take your privacy seriously. Here's how we protect your data:
          </p>
          <ul>
            <li><strong>Local Storage</strong> — All resume content and images stored in your browser's IndexedDB, never on our servers</li>
            <li><strong>No Account Required</strong> — Start creating immediately without sign-up or login</li>
            <li><strong>No Data Collection (Resumes)</strong> — Your resume content and images are never collected or transmitted</li>
            <li><strong>Open Source</strong> — Fully transparent code that you can audit and contribute to</li>
            <li><strong>You Own Your Data</strong> — Export and backup your resumes anytime, full control always yours</li>
          </ul>
        </section>

        <section>
          <h2>Credits & Acknowledgments</h2>
          <p>
            This project stands on the shoulders of giants. We're grateful to the open-source community for making
            tools like this possible. Special thanks to these projects and libraries:
          </p>
          <table class="credits-table">
            <thead>
              <tr>
                <th>Project / Library</th>
                <th>Purpose</th>
                <th>License</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><a href="https://github.com/Renovamen/oh-my-cv" target="_blank" rel="nofollow noopener noreferrer">ohmycv</a></td>
                <td>Original project this was forked from</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://nuxt.com" target="_blank" rel="nofollow noopener noreferrer">Nuxt 3</a></td>
                <td>Web framework</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://github.com/vuejs/vue-next" target="_blank" rel="nofollow noopener noreferrer">Vue 3</a></td>
                <td>UI framework</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://github.com/vitejs/vite" target="_blank" rel="nofollow noopener noreferrer">Vite</a></td>
                <td>Build tool</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://zagjs.com/" target="_blank" rel="nofollow noopener noreferrer">Zag</a></td>
                <td>UI component primitives</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://github.com/antfu/unocss" target="_blank" rel="nofollow noopener noreferrer">UnoCSS</a></td>
                <td>Atomic CSS engine</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://github.com/microsoft/monaco-editor" target="_blank" rel="nofollow noopener noreferrer">Monaco Editor</a></td>
                <td>Code editor</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://github.com/KaTeX/KaTeX" target="_blank" rel="nofollow noopener noreferrer">KaTeX</a></td>
                <td>Math rendering</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://pinia.vuejs.org/" target="_blank" rel="nofollow noopener noreferrer">Pinia</a></td>
                <td>State management</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://vueuse.org/" target="_blank" rel="nofollow noopener noreferrer">VueUse</a></td>
                <td>Vue composition utilities</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://github.com/eligrey/FileSaver.js" target="_blank" rel="nofollow noopener noreferrer">file-saver</a></td>
                <td>File saving</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://github.com/lalalic/html-docx-js" target="_blank" rel="nofollow noopener noreferrer">html-docx-js-typescript</a></td>
                <td>DOCX export</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://github.com/localForage/localForage" target="_blank" rel="nofollow noopener noreferrer">localforage</a></td>
                <td>Offline storage</td>
                <td>Apache License 2.0</td>
              </tr>
              <tr>
                <td><a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="nofollow noopener noreferrer">markdown-it</a></td>
                <td>Markdown parsing</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://i18n.nuxtjs.org/" target="_blank" rel="nofollow noopener noreferrer">@nuxtjs/i18n</a></td>
                <td>Internationalization</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://color-mode.nuxtjs.org/" target="_blank" rel="nofollow noopener noreferrer">@nuxtjs/color-mode</a></td>
                <td>Dark mode support</td>
                <td>MIT License</td>
              </tr>
              <tr>
                <td><a href="https://vite-pwa-org.netlify.app/" target="_blank" rel="nofollow noopener noreferrer">@vite-pwa/nuxt</a></td>
                <td>PWA support</td>
                <td>MIT License</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Analytics</h2>
          <p>
            When you use the hosted version at <a href="https://junian.dev/markdown-resume/" target="_blank" rel="nofollow noopener noreferrer">junian.dev/markdown-resume/</a>,
            we use <strong>Google Analytics</strong> and <strong>Cloudflare Web Analytics</strong> to understand aggregate usage patterns.
            These help us improve the application by showing us things like page views and active users.
          </p>
          <p>
            <strong>Important:</strong> Your resume content, document settings, and uploaded images are <em>never</em> included
            in analytics events. We only collect pseudonymous technical information to help us make the app better.
            Google Analytics is used in a pseudonymous manner, and no resume content is transmitted to analytics providers.
            By using the hosted version, you agree to our <a href="./privacy-policy/" target="_blank" rel="nofollow noopener noreferrer">Privacy Policy</a>.
          </p>
        </section>

        <section>
          <h2>Get in Touch</h2>
          <p>
            Have questions, feedback, or want to contribute? We'd love to hear from you!
            Visit <a href="https://www.junian.dev/" target="_blank" rel="nofollow noopener noreferrer">Junian.dev</a> or check out the
            repository to get involved.
          </p>
        </section>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
useHead({ title: "About — Markdown Resume" });
</script>

<style scoped>
.about-content {
  @apply space-y-8 leading-7 text-gray-700 dark:text-gray-200;
}

.about-content section {
  @apply space-y-3;
}

.about-content h2 {
  @apply text-xl font-bold text-black dark:text-white;
}

.about-content ul {
  @apply list-disc pl-5 space-y-1;
}

.about-content a {
  @apply text-brand underline underline-offset-2;
}

.credits-table {
  @apply w-full border-collapse text-sm;
}

.credits-table thead {
  @apply border-b border-gray-300 dark:border-gray-600;
}

.credits-table th {
  @apply text-left font-bold text-black dark:text-white py-3 px-4;
}

.credits-table tbody tr {
  @apply border-b border-gray-200 dark:border-gray-700;
}

.credits-table tbody tr:last-child {
  @apply border-b-0;
}

.credits-table td {
  @apply py-3 px-4 text-gray-700 dark:text-gray-300;
}

.credits-table td a {
  @apply text-brand hover:underline;
}
</style>
