# Changelog

This changelog summarizes the project from its initial commit through the latest changes. It is derived from the complete Git history; repetitive dependency bumps, merge commits, and minor housekeeping are consolidated under their corresponding periods.

## 2026

### July 22 — Responsive editor, PWA routing, thumbnails, and Iconify 3

- Fixed image paths and service-worker behavior for installations hosted at `/` or in a subdirectory.
- Enabled development service-worker updates and corrected deep-link navigation fallbacks so refreshes and manually entered editor URLs retain their route.
- Added a storage-estimate refresh control.
- Added loading indicators and skeleton states while browser storage usage is refreshed.
- Moved Settings to the bottom of the main sidebar.
- Added animated resume-thumbnail placeholders, a minimum display duration, and a smooth final-preview reveal.
- Kept resume thumbnails immediately clickable while their loading placeholders are visible, and ensured hover actions stay above the placeholder.
- Fixed duplicate text while renaming a resume.
- Added silent autosave when Enter inserts a new line in the Markdown or CSS editor, and centralized the save flow.
- Added a persistent setting for toggling editor line numbers.
- Made the editor/preview splitter responsive: side-by-side on desktop and vertically stacked on tablet and mobile.
- Fixed mobile splitter initialization after a direct page refresh.
- Unified sidebar-aware layouts across the editor, resume list, images, settings, About, and Privacy pages.
- Improved the resume-list and image-gallery headings with localized descriptions and responsive layouts.
- Added a system CJK font option and updated the default CJK typography.
- Added app-scoped service-worker cache naming and cleared related caches when erasing all local data.
- Migrated default resume icons from legacy Iconify span markup to Iconify 3 web components.
- Centralized the Iconify runtime URL for the app and exported HTML.
- Added the **Fix Icons** tool to migrate and save legacy Iconify markup in existing resumes.

### July 21 — Navigation, settings, privacy, and mobile editing

- Redesigned the left navigation and right formatting sidebar with responsive collapsed states and transitions.
- Added a mobile header, hamburger navigation, outside-click dismissal, and breakpoint-specific sidebar behavior.
- Prevented the formatting sidebar from covering the preview pane.
- Added compact export actions for PDF, Markdown, HTML, and DOCX.
- Improved edit-page sizing and overflow behavior.
- Added About and Privacy navigation sections, external links, and a privacy-policy page.
- Added the Settings page with language, appearance, storage, and editor controls.
- Replaced the language selector with a themed, accessible dropdown.
- Added browser storage estimates and explanatory quota text.
- Added a protected Danger Zone flow requiring `DELETE` before erasing all local content and settings.
- Added an editor minimap preference, enabled by default for Markdown and CSS.
- Kept resume previews and resume-list thumbnails in light mode while the surrounding app uses dark mode.
- Refined the dark theme toward a Visual Studio Code-inspired palette.

### July 14–20 — Configuration and print fixes

- Centralized site configuration and removed hard-coded deployment paths.
- Integrated the image service worker through Workbox and removed an obsolete service-worker plugin.
- Removed unwanted gray backgrounds and rounded corners from printed output.

### July 5–8 — Local image gallery and self-contained exports

- Added an IndexedDB-backed image gallery with upload, sorting, URL copying, duplication, and deletion.
- Added stable relative image URLs using `./images/{id}` for subdirectory-safe hosting.
- Added service-worker image responses sourced from IndexedDB.
- Added image resolution in the editor preview.
- Inlined local images as base64 data URLs in HTML and DOCX exports.
- Expanded navigation with About, privacy, profile, project, and sponsorship links.
- Added Disqus comment integration.
- Added analytics disclosures and documented self-hosting and environment variables.

### June — Analytics, SEO, licensing, and acknowledgments

- Added Google Analytics 4 and Microsoft Clarity integrations with environment-based configuration.
- Improved SEO metadata, canonical URLs, and site configuration.
- Added acknowledgments for adapted and third-party open-source work.
- Changed the project license to AGPL-3.0 and improved attribution documentation.
- Updated hosted asset and domain references.

### May — Build automation

- Added a deployment build script and refined static-host redirect handling.
- Adjusted header markup for more flexible layouts.

### February — Export and localization expansion

- Added HTML export with Iconify support, paper-aware styling, and print-accurate output.
- Added DOCX export and extracted reusable HTML generation logic.
- Added Indonesian localization and reorganized active locale configuration.
- Improved resume-card controls, editable-name validation, and layout styling.
- Updated README documentation for the expanded export workflow.

## 2025

### September–October

- Upgraded Monaco Editor to resolve editor compatibility issues.
- Lowered the minimum configurable resume font size to 10 px.
- Refined English interface copy.

### June

- Fixed spacing after automatic page breaks and merged the community contribution.
- Updated the production domain and preview styling.

## 2024

### April–November — Nuxt-era refinement and Markdown Resume identity

- Replaced Vue I18n integration with `@nuxtjs/i18n` and fixed client-only storage access.
- Replaced the split-pane implementation with Zag Splitter.
- Fixed Markdown plugin types, slider tooltips, printing, routing, and deployment base paths.
- Renamed and rebranded the application as Markdown Resume / Resume.md.
- Reworked the default resume content and ordering, including experience, education, skills, summary, and publications.
- Adopted an ATS-oriented default design with black styling and web-safe fonts.
- Expanded Arial-compatible font choices and refined default CSS, headings, dates, and preview behavior.
- Updated deployment automation, licensing, README content, and the edit-page resume-name layout.

### January — Component modernization and translations

- Added Spanish translation support and clarified locale labels.
- Rebuilt several interactive components, toasts, and file upload controls with Zag.js.
- Replaced the icon implementation with UnoCSS preset icons.
- Fixed font-selector loading behavior and combobox interactions.

## 2023

### September–November — Nuxt migration

- Published package version 0.1.1 and corrected package exports.
- Migrated the site from Vite SSG to Nuxt.
- Updated edit routes, printing behavior, internationalization, and responsive preview sizing.
- Reimplemented several controls with Zag.js and fixed the font combobox.

### May–August — Page controls and maintenance

- Added the Euclid font.
- Added explicit `\newpage` support.
- Fixed duplicated locale output and refreshed dependencies, formatting, and package metadata.

### January–February — Resume library, CSS customization, and PWA

- Added zoom controls and extracted a reusable zoom package.
- Reorganized components and resolved pane naming conflicts.
- Added the **My Resumes** list, sorting by update time, and backward-compatible timestamps.
- Fixed resume renaming and Google Font observation.
- Added custom CSS editing.
- Added offline PWA support, a landing page, a redesigned resume creation card, and updated branding.
- Fixed static route generation, navigation links, mobile landing layout, theme metadata, and preview sizing.
- Improved SEO and moved the app to its dedicated domain.

## 2022

### October–December — Data import and fonts

- Added local resume-data import.
- Added TeX Gyre Pagella and Adobe Garamond Pro, and removed invalid font entries.
- Continued dependency and compatibility maintenance.

### September — Academic CV and formatting tools

- Added cross-references for publications and academic CVs.
- Added Minion Pro and Chinese font options.
- Changed citation syntax from `[^x]` to `[~x]` to avoid footnote conflicts.
- Moved default resume content into code and fixed date display.
- Added case correction, Google Fonts selection, toolbar navigation, multi-column definition lists, and LaTeX-style line breaks.
- Extracted and renamed utility packages and published version 0.1.0.

### August — Multiple resumes and local persistence

- Added local browser persistence and multiple-resume management.
- Added toast notifications, duplicate resume, and platform-aware Ctrl/Cmd+S shortcuts.
- Added backup/export-to-Markdown workflows and local database restore.
- Improved the toolbar, mobile import panel, metadata, logos, page sizing, and ordered-list styling.

### June–July — UI, packaging, and toolbar controls

- Added saved export filenames and reorganized reusable code into workspace packages.
- Migrated static generation to Vite SSG.
- Refined resume headers, theme styling, printing color accuracy, and overall UI.
- Added formatting-toolbar toggling and fixed paper-size updates.
- Updated branding, favicons, aliases, types, and dependencies.

### April–May — Typography, math, localization, and PDF formats

- Added editable font families, font size, line height, and paragraph spacing.
- Added dark mode and dark-mode-aware favicons.
- Added additional Chinese fonts and font-loading-aware page breaking.
- Migrated from Yarn to pnpm and from Windi CSS to UnoCSS.
- Added KaTeX math rendering and US Letter PDF export.
- Added tooltips and English/Chinese internationalization.
- Migrated state management from Vuex to Pinia and expanded auto imports.

### March — Initial editor

- Created the project and shipped the first working version.
- Added automated build and deployment, the initial website, and favicons.
- Added automatic page breaking and the first UI refinements.
- Added Markdown import from local files and URLs.
- Added editable page margins and theme colors.
- Fixed incomplete front matter and preview scaling issues.
