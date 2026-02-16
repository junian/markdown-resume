<h1 align="center">Markdown Resume</h1>

<p align="center">Write an ATS-friendly resume in Markdown. Available for everyone, optimized for developers.</p>

<p align="center"><a href="https://www.junian.dev/markdown-resume/"><strong>Start Writing Now</strong></a>!</p>

<img align="center" src="https://raw.githubusercontent.com/junian/markdown-resume/assets/img/markdown-resume-screenshot-00.jpg"/>

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
- Pick any fonts from [Google Fonts](https://fonts.google.com/)
- Add icons easily via [Iconify](https://github.com/iconify/iconify) (search icons on [Icônes](https://icones.js.org/))
- TeX support ([KaTeX](https://github.com/KaTeX/KaTeX))
- Cross-referencing (useful for academic CVs)
- Case correction (e.g., `Github` → `GitHub`)
- Add line breaks (`\\[10px]`) or start a new page (`\newpage`) like in LaTeX
- Automatic page breaking
- Custom CSS support
- Manage multiple resumes
- Your data stays in your hands:
  - Data is saved locally in your browser (see [here](https://localforage.github.io/localForage/) for details)
  - Open-source static website hosted on [GitHub Pages](https://pages.github.com/), which does not (and cannot) collect your data
  - No user tracking, no ads
- Dark mode

## Development

Built with [Nuxt 3](https://nuxt.com), powered by [Vue 3](https://github.com/vuejs/vue-next), [Vite](https://github.com/vitejs/vite), [Zag](https://zagjs.com/), and [UnoCSS](https://github.com/antfu/unocss).

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
