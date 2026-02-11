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
  
  // Generate dynamic CSS based on current styles
  const dynamicCss = `
    /* Dynamic Styles */
    body {
      font-family: ${styles.fontEN.fontFamily || styles.fontEN.name}, ${styles.fontCJK.fontFamily || styles.fontCJK.name};
      font-size: ${styles.fontSize}px;
      background-color: white;
      color: black;
      margin: ${styles.marginV}px ${styles.marginH}px;
    }
    
    :not(.resume-header-item) > a {
      color: ${styles.themeColor};
    }
    
    h1, h2, h3 {
      color: ${styles.themeColor};
    }
    
    h1, h2 {
      border-bottom-color: ${styles.themeColor};
    }
    
    p, li {
      line-height: ${styles.lineHeight.toFixed(2)};
    }
    
    h2, h3 {
      line-height: ${(styles.lineHeight * 1.154).toFixed(2)};
    }
    
    dl {
      line-height: ${(styles.lineHeight * 1.038).toFixed(2)};
    }
    
    h2 {
      margin-top: ${styles.paragraphSpace}px;
    }
  `;
  
  // Combine backbone CSS with dynamic CSS
  const fullCss = data.cssContent + dynamicCss;
  
  // Create complete HTML document
  const htmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.curResumeName}</title>
  <style>
${fullCss}
  </style>
</head>
<body>
  <main id="vue-smart-pages-preview">
${html}
  </main>
</body>
</html>`;
  
  downloadFile(`${saveName.value}.html`, htmlDocument);
};
</script>
