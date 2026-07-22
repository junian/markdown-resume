import { downloadFile } from "@renovamen/utils";
import { siteConfig } from "~~/configs/siteConfig";

export const useResumeExport = () => {
  const { data } = useDataStore();
  const { styles } = useStyleStore();
  const saveName = computed(() => data.curResumeName.trim().replace(/\s+/g, "_"));

  const generateHtmlDocument = async () => {
    let html = renderMarkdown(data.mdContent);
    html = await inlineImagesInHtml(html);

    const paperWidthPx = getPaperPx(styles.paper, "w");
    const dynamicCss = `
      body {
        font-family: ${styles.fontEN.fontFamily || styles.fontEN.name}, ${styles.fontCJK.fontFamily || styles.fontCJK.name};
        font-size: ${styles.fontSize}px;
        background-color: #f5f5f5;
        color: black;
        margin: 0;
        padding: 20px;
        display: flex;
        justify-content: center;
      }
      #vue-smart-pages-preview {
        background-color: white;
        width: ${paperWidthPx}px;
        max-width: 100%;
        padding: ${styles.marginV}px ${styles.marginH}px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
      }
      :not(.resume-header-item) > a, h1, h2, h3 { color: ${styles.themeColor}; }
      h1, h2 { border-bottom-color: ${styles.themeColor}; }
      p, li { line-height: ${styles.lineHeight.toFixed(2)}; }
      h2, h3 { line-height: ${(styles.lineHeight * 1.154).toFixed(2)}; }
      dl { line-height: ${(styles.lineHeight * 1.038).toFixed(2)}; }
      h2 { margin-top: ${styles.paragraphSpace}px; }
      @media print {
        body { background-color: white; padding: 0; margin: 0; }
        #vue-smart-pages-preview {
          width: 100%;
          max-width: none;
          box-shadow: none;
          margin: 0;
          padding: ${styles.marginV}px ${styles.marginH}px;
        }
        @page { size: ${styles.paper}; margin: 0; }
      }
    `;

    const scriptTag = `<script src="${siteConfig.iconifyScriptURL}"></script>`;
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.curResumeName}</title>
  ${scriptTag}
  <style>${data.cssContent + dynamicCss}</style>
</head>
<body><main id="vue-smart-pages-preview" class="markdown-resume">${html}</main></body>
</html>`;
  };

  const exportPDF = () => {
    const title = document.title;
    document.title = saveName.value;
    window.print();
    document.title = title;
  };

  const exportMd = () => downloadFile(`${saveName.value}.md`, data.mdContent);

  const exportHtml = async () => {
    downloadFile(`${saveName.value}.html`, await generateHtmlDocument());
  };

  const exportDocx = async () => {
    try {
      const htmlDocument = await generateHtmlDocument();
      const { asBlob } = await import("html-docx-js-typescript");
      // @ts-ignore file-saver does not provide types
      const { saveAs } = await import("file-saver");
      asBlob(htmlDocument).then((blob) => saveAs(blob, `${saveName.value}.docx`));
    } catch (error) {
      console.error("Error exporting DOCX:", error);
      alert("Failed to export DOCX. Please try again.");
    }
  };

  return { exportPDF, exportMd, exportHtml, exportDocx };
};
