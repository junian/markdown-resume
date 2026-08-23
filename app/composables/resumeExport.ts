import { downloadFile, downloadBlob } from '~/libs/utils'
import { getDynamicCss } from '~/utils/css'
import { replaceIconifyIconsInHtml } from '~/utils/iconifySvg'
import { PREVIEW_SELECTOR } from '~/utils/constants/default'

export const useResumeExport = () => {
  const { data } = useDataStore()
  const { styles } = useStyleStore()
  const saveName = computed(() => data.curResumeName.trim().replace(/\s+/g, '_'))

  const generateHtmlDocument = async () => {
    let html = renderMarkdown(data.mdContent)
    html = await inlineImagesInHtml(html)
    html = await replaceIconifyIconsInHtml(html)

    const paperWidthPx = getPaperPx(styles.paper, 'w')
    const dynamicCss = `
      body {
        background-color: #f5f5f5;
        color: black;
        margin: 0;
        padding: 20px;
        display: flex;
        justify-content: center;
      }
      main {
        background-color: white;
        width: ${paperWidthPx}px;
        max-width: 100%;
        padding: ${styles.marginV}px ${styles.marginH}px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
      }
      ${getDynamicCss(styles, 'preview')}
      @media print {
        body { background-color: white; padding: 0; margin: 0; }
        main {
          width: 100%;
          max-width: none;
          box-shadow: none;
          margin: 0;
          padding: ${styles.marginV}px ${styles.marginH}px;
        }
        @page { size: ${styles.paper}; margin: 0; }
      }
    `

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.curResumeName}</title>
  <style>${data.cssContent + dynamicCss}</style>
</head>
<body><main id="vue-smart-pages-preview" class="markdown-resume">${html}</main></body>
</html>`
  }

  const exportPDF = () => {
    const title = document.title
    document.title = saveName.value
    window.print()
    document.title = title
  }

  const exportMd = () => downloadFile(`${saveName.value}.md`, data.mdContent)

  const exportHtml = async () => {
    downloadFile(`${saveName.value}.html`, await generateHtmlDocument())
  }

  const exportDocx = async () => {
    try {
      const { convertHtmlToDocx } = await import('dom-docx/browser')

      const preview = document.querySelector(PREVIEW_SELECTOR) as HTMLElement
      if (!preview) throw new Error('Preview element not found')

      let html = await inlineImagesInHtml(preview.innerHTML)
      html = html.replace(
        /<div class="vue-smart-page-break"[^>]*>\s*<\/div>/gi,
        '<p style="break-after:page"></p>',
      )

      const blob = await convertHtmlToDocx(html, {
        styleSource: 'computed',
        root: preview,
        pageSize: styles.paper === 'A4' ? 'a4' : 'letter',
        margins: {
          top: styles.marginV / 96,
          right: styles.marginH / 96,
          bottom: styles.marginV / 96,
          left: styles.marginH / 96,
        },
        metadata: { title: data.curResumeName },
        rasterizeInPlace: { scale: 2 },
        imageResolver: async (src) => {
          const res = await fetch(src);
          if (!res.ok) return null;
          return { data: new Uint8Array(await res.arrayBuffer()), type: res.headers.get('Content-Type') || 'image/png' };
        },
      })

      downloadBlob(`${saveName.value}.docx`, blob)
    }
    catch (error) {
      console.error('Error exporting DOCX:', error)
      alert('Failed to export DOCX. Please try again.')
    }
  }

  return { exportPDF, exportMd, exportHtml, exportDocx }
}
