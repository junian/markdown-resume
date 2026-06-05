<div align="center">

<img src="https://raw.githubusercontent.com/junian/commons-media/refs/heads/master/svg/markdown-mark-logo.svg" style="height: 96px;" alt="Markdown Logo" title="Markdown Logo" />

# Markdown Resume

Write an ATS-friendly resume in Markdown. Available for everyone, optimized for developers.

[![Markdown Resume](https://img.shields.io/badge/Start_Writing_Now-1a73e8?style=for-the-badge&logo=markdown&logoColor=white "Write Resume in Markdown")][app]

[![Markdown Resume Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi0XXzED8hJoI6NjzZSGKN68nANKihJrglZSuv9LnTFrSTN6w7Xgl0smpr8q5s6vLGCl1BOIeQYeBF-AbpOxpOHzeR6531A3eAuLJrTUimd01QWAmvP6gZZYUggkND1q7LOh5iQuNJg3nu7ekr5wezPa9quyhh0O9itQj9qTPY0vkmdwv1dtfTa-7uYsds/s1600/markdown-resume-screenshot.png "Markdown Resume")][app]

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
- Dark mode

## Development

Built with:

- [Nuxt 3](https://nuxt.com)
- [Vue 3](https://github.com/vuejs/vue-next)
- [Vite](https://github.com/vitejs/vite)
- [Zag](https://zagjs.com/)
- [UnoCSS](https://github.com/antfu/unocss)

Clone the repo and install dependencies:

```bash
pnpm install
```

Build the [packages](packages):

```bash
pnpm build:pkg
```

To enable font selection from [Google Fonts](https://fonts.google.com/), generate a [Google Fonts Developer API Key](https://developers.google.com/fonts/docs/developer_api#APIKey). Then create a `.env` file inside the [`site`](site/) folder and add:

```
NUXT_PUBLIC_GOOGLE_FONTS_KEY="YOUR_API_KEY"
```

Start developing / building the site:

```bash
pnpm dev
pnpm build
```

## Credits

- Original project: [Renovamen/oh-my-cv](https://github.com/Renovamen/oh-my-cv)
- [billryan/resume](https://github.com/billryan/resume)

## License

This project is licensed under the [MIT](LICENSE) license.

---

Made with ☕ by [Junian.dev](https://www.junian.dev).

[careercup]: <https://web.archive.org/web/20240501052328/https://www.careercup.com/resume> "CareerCup Good Resume"
[chrome]: <https://www.google.com/chrome/> "Download Google Chrome"
[edge]: <https://www.microsoft.com/en-us/edge/> "Download Microsoft Edge"
[pwa]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
[app]: <https://www.junian.dev/markdown-resume/> "Write Resume / CV in Markdown"
