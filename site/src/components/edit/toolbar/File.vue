<template>
  <ToolItem :text="$t('toolbar.file.text')" icon="i-carbon:import-export">
    <Dialog
      id="import-md"
      :title="$t('import.title')"
      icon="i-mdi:upload"
      box-class="w-full md:w-96"
    >
      <template #button>
        <li class="dropdown-li space-x-1.5 rounded" role="button">
          <span i-mdi:upload text-base />
          <span>{{ $t("toolbar.file.import") }}</span>
        </li>
      </template>

      <template #content>
        <ImportDialogContent />
      </template>
    </Dialog>

    <hr border-dashed border-c my-1 />

    <li class="dropdown-li space-x-1.5 rounded" role="button" @click="exportPDF">
      <span i-mdi:file-pdf text-base />
      <span>{{ $t("toolbar.file.export_pdf") }}</span>
    </li>

    <li class="dropdown-li space-x-1.5 rounded" role="button" @click="exportMd">
      <span i-ri:markdown-fill text-base />
      <span>{{ $t("toolbar.file.export_md") }}</span>
    </li>

    <li class="dropdown-li space-x-1.5 rounded" role="button" @click="exportHtml">
      <span i-mdi:language-html5 text-base />
      <span>{{ $t("toolbar.file.export_html") }}</span>
    </li>
  </ToolItem>
</template>

<script lang="ts" setup>
import { downloadFile } from "@renovamen/utils";

const { data } = useDataStore();
const { styles } = useStyleStore();
const saveName = computed(() => data.curResumeName.trim().replace(/\s+/g, "_"));

const exportPDF = () => {
  const title = document.title;

  document.title = saveName.value;
  window.print();
  document.title = title;
};

const exportMd = () => {
  downloadFile(`${saveName.value}.md`, data.mdContent);
};

const exportHtml = () => {
  const html = renderMarkdown(data.mdContent);

  const fontEN = styles.fontEN.fontFamily || styles.fontEN.name;
  const fontCJK = styles.fontCJK.fontFamily || styles.fontCJK.name;

  const backboneCss = data.cssContent.replaceAll(
    PREVIEW_SELECTOR,
    ".resume"
  );

  const paper = styles.paper;
  const paperW = PAPER[paper].w;

  const dynamicCss = `

.resume {
  font-family: ${fontEN}, ${fontCJK}, sans-serif;
  font-size: ${styles.fontSize}px;
  padding: ${styles.marginV}px ${styles.marginH}px;
  width: ${paperW}mm;
  box-sizing: border-box;
  margin: 0 auto;
}

.resume :not(.resume-header-item) > a {
  color: ${styles.themeColor};
}

.resume h1, .resume h2, .resume h3 {
  color: ${styles.themeColor};
  font-weight: bold;
}

.resume h1, .resume h2 {
  border-bottom-color: ${styles.themeColor};
}

.resume p, .resume li {
  line-height: ${styles.lineHeight.toFixed(2)};
}

.resume h2, .resume h3 {
  line-height: ${(styles.lineHeight * 1.154).toFixed(2)};
}

.resume dl {
  line-height: ${(styles.lineHeight * 1.038).toFixed(2)};
}

.resume h2 {
  margin-top: ${styles.paragraphSpace}px;
}
`;

  const printCss = `
@media print {
  @page {
    size: ${paper};
    margin: 0;
  }
  html, body {
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .resume {
    width: 100%;
    margin: 0;
    box-shadow: none;
  }
}
`;

  const screenCss = `
@media screen {
  html {
    background: #f0f0f0;
  }
  body {
    margin: 0;
    padding: 20px 0;
  }
  .resume {
    background: white;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    margin: 0 auto;
  }
}
`;

  const isSystemFont = (name: string) =>
    EN_FONTS.some((f) => (f.fontFamily || f.name) === name) ||
    CJK_FONTS.some((f) => (f.fontFamily || f.name) === name);

  let googleFontsLink = "";
  const gFontFamilies: string[] = [];
  if (!isSystemFont(fontEN)) gFontFamilies.push(fontEN);
  if (!isSystemFont(fontCJK)) gFontFamilies.push(fontCJK);
  if (gFontFamilies.length) {
    const families = gFontFamilies
      .map((f) => `family=${f.replace(/\s+/g, "+")}:wght@400;700`)
      .join("&");
    googleFontsLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?${families}&display=swap">`;
  }

  const htmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.curResumeName}</title>
  ${googleFontsLink}
  <script src="https://code.iconify.design/3/3.1.1/iconify.min.js"><\/script>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <style>
${backboneCss}
${dynamicCss}
${screenCss}
${printCss}
  </style>
</head>
<body>
  <article class="resume">
${html}
  </article>
</body>
</html>`;

  downloadFile(`${saveName.value}.html`, htmlDocument);
};
</script>
