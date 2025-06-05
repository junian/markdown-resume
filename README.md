<h1 align="center">Markdown Resume</h1>

<p align="center">Write an ATS-friendly Resume in Markdown. Available for anyone, Optimized for Dev.</p>

<p align="center"><a href="https://www.junian.dev/markdown-resume/"><strong>Start Writing Now</strong></a>!</p>

<img align="center" src="https://raw.githubusercontent.com/junian/markdown-resume/assets/img/markdown-resume-screenshot-00.jpg"/>

## About

A fork of "Oh My CV!". You can visit the original work [here](https://ohmycv.app/).

Changes I made from the original work:

- Default template is now as close as possible with [CareerCup's](https://www.careercup.com/resume) resume template.
- Default color is all Black.
- Added Web-safe fonts for easier ATS parsing.
- And many more ...

## Notice

Highly recommend using Chromium-based browsers, e.g., [Chrome](https://www.google.com/chrome/) and [Microsoft Edge](https://www.microsoft.com/en-us/edge).

## Features

- Write your resume in Markdown and preview it in real-time, it's smooth!
- It works offline ([PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps))
- Export to A4 and US Letter size PDFs
- Customize page margins, theme colors, line heights, fonts, etc.
- Pick any fonts from [Google Fonts](https://fonts.google.com/)
- Add icons easily via [Iconify](https://github.com/iconify/iconify) (search for icons on [Icônes](https://icones.js.org/))
- Tex support ([KaTeX](https://github.com/KaTeX/KaTeX))
- Cross-reference (would be useful for an academic CV)
- Case correction (e.g. `Github` -> `GitHub`)
- Add line breaks (`\\[10px]`) or start a new page (`\newpage`) just like in LaTeX
- Break pages automatically
- Customize CSS
- Manage multiple resumes
- Your data in your hands:
  - Data are saved locally within your browser, see [here](https://localforage.github.io/localForage/) for details
  - Open-source static website hosted on [Github Pages](https://pages.github.com/), which doesn't (have the ability to) collect your data
  - No user tracking, no ads
- Dark mode

## Prerequisites

- **pnpm 8.15.6+** - This project uses pnpm as the package manager
- **Node.js** - Compatible with the version specified in the project
- **Chromium-based browser** - Recommended for optimal experience (Chrome, Edge, etc.)

## Installation & Setup

This project is a monorepo containing workspace packages and a Nuxt.js site. Follow these steps to get it running:

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd markdown-resume
pnpm install
```

### 2. Build Workspace Packages

Build all the workspace packages that the site depends on:

```bash
pnpm build:pkg
```

### 3. Build the Application

Generate the static site build:

```bash
pnpm build
```

### 4. Start Development Server

Start the development server:

```bash
pnpm dev
```

The application will be available at: **<http://localhost:3000/markdown-resume/>**

## Development

### Tech Stack

Built on [Nuxt 3](https://nuxt.com), with the power of [Vue 3](https://github.com/vuejs/vue-next), [Vite](https://github.com/vitejs/vite), [Zag](https://zagjs.com/), and [UnoCSS](https://github.com/antfu/unocss).

### Project Structure

This is a monorepo with the following structure:

- **`site/`** - Main Nuxt.js application
- **`packages/`** - Workspace packages including:
  - `correct-case` - Case correction utilities
  - `dynamic-css` - Dynamic CSS utilities
  - `front-matter` - Front matter parsing
  - `gfonts-loader` - Google Fonts loader
  - `markdown-it-*` - Markdown-it plugins
  - `utils` - Shared utilities
  - `vue-*` - Vue.js components and utilities

### Google Fonts API (Optional)

To enable picking fonts from [Google Fonts](https://fonts.google.com/), you will need to generate a [Google Fonts Developer API Key](https://developers.google.com/fonts/docs/developer_api#APIKey). Then, create a `.env` file in [`site`](site/) folder and put:

```
NUXT_PUBLIC_GOOGLE_FONTS_KEY="YOUR_API_KEY"
```

### Build Output

- **Development**: Runs on <http://localhost:3000/markdown-resume/>
- **Production**: Static files are generated in `.output/public` and ready for deployment to any static hosting service

## Known Issues

The following warnings may appear during build/development but **do not affect functionality**:

- **CSS Minification Warning**: Monaco editor internal CSS syntax issue - known Monaco editor limitation
- **Large Chunk Warning**: Monaco editor creates large bundles - performance optimization opportunity
- **Deprecation Warnings**: Node.js fs.Stats constructor deprecation - framework-level issue

These are minor configuration or optimization suggestions and the application works perfectly despite these warnings.

### Recently Fixed Issues *(Updated: December 2024)*

The following issues have been resolved:

- ✅ **Site Config Warning**: Fixed invalid URL configuration in `nuxt.config.ts` - removed path from site URL
- ✅ **PWA Warning**: Added missing `theme_color` and `background_color` to PWA manifest for proper app installation
- ✅ **Browserslist Database**: Updated caniuse-lite database to latest version (1.0.30001721)

### Configuration Changes Made

1. **`site/nuxt.config.ts`**: Updated `site.url` from `"https://www.juniansoft.com/markdown-resume/"` to `"https://www.juniansoft.com"`
2. **`site/configs/pwa.ts`**: Added `theme_color: "#000000"` and `background_color: "#ffffff"` to PWA manifest
3. **`site/src/assets/css/index.css`**: Added CSS override for Monaco editor styling issues
4. **Dependencies**: Updated browserslist database using `npx update-browserslist-db@latest`

## Credits

- The original work: [Renovamen/oh-my-cv](https://github.com/Renovamen/oh-my-cv)
- [billryan/resume](https://github.com/billryan/resume)

## License

This project is licensed under [MIT](LICENSE) license.

---

Made with ☕ by [Junian.dev](https://www.junian.dev).
