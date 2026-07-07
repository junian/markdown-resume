<div align="center">

<img src="https://raw.githubusercontent.com/junian/commons-media/refs/heads/master/svg/markdown-mark-logo.svg" style="height: 96px;" alt="Markdown Logo" title="Markdown Logo" />

# Markdown Resume

Write an ATS-friendly resume in Markdown. Available for everyone, optimized for developers.

[![Markdown Resume](https://img.shields.io/badge/Start_Writing_Now-1a73e8?style=for-the-badge&logo=markdown&logoColor=white "Write Resume in Markdown")][app]

[![Markdown Resume Screenshot](https://www.junian.dev/img/b/R29vZ2xl/AVvXsEi0XXzED8hJoI6NjzZSGKN68nANKihJrglZSuv9LnTFrSTN6w7Xgl0smpr8q5s6vLGCl1BOIeQYeBF-AbpOxpOHzeR6531A3eAuLJrTUimd01QWAmvP6gZZYUggkND1q7LOh5iQuNJg3nu7ekr5wezPa9quyhh0O9itQj9qTPY0vkmdwv1dtfTa-7uYsds/s1600/markdown-resume-screenshot.png "Markdown Resume")][app]

</div>

## About

This repo is a fork of [Oh My CV!](https://ohmycv.app/), which is beautifully made — go check out their work.

Changes I made from the original:

- The default template is now as close as possible to [CareerCup's][careercup] resume template.
- The default color is all black.
- Uses web-safe fonts for easier and safer ATS parsing.
- Export as HTML and DOCX.
- And many more...

I'm passionate about helping anyone get a job, which is why I made this fork.
Most of the modifications ensure your resume is readable by both ATS systems and humans, so you don’t have to worry about the design.

I can’t guarantee that using this will improve your job search success rate.
But I hope it helps.

## Notice

Highly recommend using Chromium-based browsers, e.g., [Chrome][chrome] or [Microsoft Edge][edge].

## Features

- Write your resume in Markdown and preview it in real time — smooth experience!
- Works offline ([PWA][pwa])
- Export to A4 and US Letter PDFs
- Customize page margins, theme colors, line heights, fonts, etc.
- Add icons easily via [Iconify](https://github.com/iconify/iconify) (search icons on [Icônes](https://icones.js.org/))
- TeX support ([KaTeX](https://github.com/KaTeX/KaTeX))
- Cross-referencing (useful for academic CVs)
- Case correction (e.g., `Github` → `GitHub`)
- Add line breaks (`\\[10px]`) or start a new page (`\newpage`) like in LaTeX
- Automatic page breaking
- Custom CSS support
- Manage multiple resumes
- Data is saved locally in your browser using IndexedDB browser feature (see [`localForage` repo](https://localforage.github.io/localForage/) for details)
- [**Image Gallery**](https://www.junian.dev/markdown-resume/images/) — upload images and reference them in your resume using Markdown or HTML (see below)

## Image Support

The Image Gallery screen lets you upload images and use them directly in your resume.

Once uploaded, each image gets a stable URL in the format `/markdown-resume/images/<id>` served by a [Service Worker][sw] — no external hosting needed. You can copy the URL from the gallery and paste it into your Markdown:

```markdown
![My photo](/markdown-resume/images/1234567890_abc123)
```

Or as an HTML tag:

```html
<img src="/markdown-resume/images/1234567890_abc123" alt="My photo" />
```

When exporting to **HTML** or **DOCX**, image references are automatically replaced with inline base64 data URLs so the exported file is fully self-contained.

**Privacy:** Images are stored entirely inside your browser's IndexedDB — the same storage used for your resumes. They are never uploaded to any server and never leave your computer.

## Self-Hosting

1. Clone the repository:

    ```bash
    git clone https://github.com/junian/markdown-resume.git
    cd markdown-resume
    ```

2. (Optional) Set up your environment variables. Copy the example file and fill in the values you need:

    ```bash
    cp site/.env.example site/.env
    ```

    See the [Environment Variables](#environment-variables) section for details on each variable.

3. Run the build script:

    ```bash
    ./build.sh
    ```

4. Deploy the contents of the `.output/public` directory to any static hosting provider (GitHub Pages, Netlify, Vercel, Nginx, etc.).

## Environment Variables

Configuration is done via a `.env` file inside the [`site`](site/) folder. You can copy [`site/.env.example`](site/.env.example) as a starting point:

```bash
cp site/.env.example site/.env
```

| Variable | Description |
|---|---|
| `NUXT_PUBLIC_GOOGLE_FONTS_KEY` | [Google Fonts Developer API Key](https://developers.google.com/fonts/docs/developer_api#APIKey). Required to enable the font picker that lists fonts from Google Fonts. Without this key the font selection will only show locally available fonts. |
| `NUXT_PUBLIC_GTAG_ID` | [Google Analytics 4](https://analytics.google.com/) Measurement ID (e.g. `G-XXXXXXXXXX`). Enables GA4 page-view and event tracking. Leave empty to disable analytics. |
| `NUXT_CLARITY_ID` | [Microsoft Clarity](https://clarity.microsoft.com/) Project ID. Enables session recording and heatmap analytics. Leave empty to disable Clarity. |
| `NUXT_PUBLIC_DISQUS_SHORTNAME` | [Disqus](https://disqus.com/) shortname for your site. Enables the Disqus comment section. Leave empty to hide comments. |

## Development

Clone the repo and install dependencies:

```bash
pnpm install
```

Build the [packages](packages):

```bash
pnpm run build:pkg
```

Start developing / building the site:

```bash
pnpm run dev
pnpm run build
```

## License

This project is licensed under the [AGPL-3.0](LICENSE) license.
See [ACKNOWLEDGMENTS](ACKNOWLEDGMENTS.md) for credits.

---

Made with ☕ by [Junian.dev](https://www.junian.dev).

[careercup]: <https://web.archive.org/web/20240501052328/https://www.careercup.com/resume> "CareerCup Good Resume"
[chrome]: <https://www.google.com/chrome/> "Download Google Chrome"
[edge]: <https://www.microsoft.com/en-us/edge/> "Download Microsoft Edge"
[pwa]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
[sw]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[app]: <https://www.junian.dev/markdown-resume/> "Write Resume / CV in Markdown"
