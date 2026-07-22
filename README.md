<div align="center">

<img src="https://raw.githubusercontent.com/junian/commons-media/refs/heads/master/svg/markdown-mark-logo.svg" style="height: 96px;" alt="Markdown Logo" title="Markdown Logo" />

# Markdown Resume

Write an ATS-friendly resume in Markdown. Available for everyone, optimized for developers.

[![Markdown Resume](https://img.shields.io/badge/Start_Writing_Now-1a73e8?style=for-the-badge&logo=markdown&logoColor=white "Write Resume in Markdown")][app]
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black&style=for-the-badge "Buy me a Coffee")][coffee]

[![Markdown Resume Screenshot](https://www.junian.dev/img/b/R29vZ2xl/AVvXsEi0XXzED8hJoI6NjzZSGKN68nANKihJrglZSuv9LnTFrSTN6w7Xgl0smpr8q5s6vLGCl1BOIeQYeBF-AbpOxpOHzeR6531A3eAuLJrTUimd01QWAmvP6gZZYUggkND1q7LOh5iQuNJg3nu7ekr5wezPa9quyhh0O9itQj9qTPY0vkmdwv1dtfTa-7uYsds/s1600/markdown-resume-screenshot.png "Markdown Resume")][app]

</div>

## About

Markdown Resume is a local-first editor for creating clean, ATS-friendly resumes with Markdown. It combines a code editor with a paginated live preview, practical formatting controls, and self-contained export options.

The default template is based on [CareerCup's resume template][careercup], using a restrained layout, web-safe fonts, and readable content structure so a resume works well for both applicant tracking systems and people.

Your resumes, images, and settings stay in your browser. No account is required, and your resume content is not uploaded to an application server.

I can’t guarantee that using this will improve your job search success rate.
But I hope it helps.

See the [Changelog](CHANGELOG.md) for the complete project history and latest changes.

## Notice

Highly recommend using Chromium-based browsers, e.g., [Chrome][chrome] or [Microsoft Edge][edge].

## Features

- Write your resume in Markdown and preview it in real time — smooth experience!
- Works offline ([PWA][pwa])
- Export to PDF, Markdown, self-contained HTML, and DOCX
- Export to A4 and US Letter paper sizes
- Customize page margins, theme colors, line heights, fonts, etc.
- Add icons easily via [Iconify](https://github.com/iconify/iconify) (search icons on [Icônes](https://icones.js.org/))
- Fix legacy Iconify markup from older resumes and save the migrated content
- TeX support ([KaTeX](https://github.com/KaTeX/KaTeX))
- Cross-referencing (useful for academic CVs)
- Case correction (e.g., `Github` → `GitHub`)
- Add line breaks (`\\[10px]`) or start a new page (`\newpage`) like in LaTeX
- Automatic page breaking
- Custom CSS support
- Manage, rename, duplicate, import, back up, and delete multiple resumes
- Automatically save editor changes when adding a new line, with Ctrl/Cmd+S support
- Responsive editing layout for desktop, tablet, and mobile
- Optional Monaco editor minimap
- Light document previews in every color theme
- Animated resume thumbnail placeholders while previews render
- Light, dark, and system appearance modes
- English and Indonesian interface languages
- Local storage usage estimates, refresh controls, and a protected factory-reset action
- Data is saved locally in your browser using IndexedDB browser feature (see [`localForage` repo](https://localforage.github.io/localForage/) for details)
- [**Image Gallery**](https://www.junian.dev/markdown-resume/images/) — upload images and reference them in your resume using Markdown or HTML (see below)

## Image Support

The Image Gallery screen lets you upload images and use them directly in your resume.

Once uploaded, each image gets a stable URL in the format `./images/<id>` served by a [Service Worker][sw] — no external hosting needed. You can copy the URL from the gallery and paste it into your Markdown:

```markdown
![My photo](./images/1234567890_abc123)
```

Or as an HTML tag:

```html
<img src="./images/1234567890_abc123" alt="My photo" />
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
[coffee]: <https://www.junian.dev/coffee/> "Buy Junian.dev a Coffee"
