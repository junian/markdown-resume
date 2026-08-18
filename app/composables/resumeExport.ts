import { downloadFile } from '~/libs/utils'
import { getDynamicCss } from '~/utils/css'
import { replaceIconifyIconsInHtml } from '~/utils/iconifySvg'

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
      #vue-smart-pages-preview {
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
        #vue-smart-pages-preview {
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
      const htmlDocument = await generateHtmlDocument()
      const HTMLtoDOCX = (await import('@turbodocx/html-to-docx')).default
      const { fileSave } = await import('browser-fs-access')
      const result = await HTMLtoDOCX(htmlDocument)
      const blob = result instanceof Blob
        ? result
        : new Blob([result as BlobPart], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          })
      fileSave(blob, { fileName: `${saveName.value}.docx` })
    }
    catch (error) {
      console.error('Error exporting DOCX:', error)
      alert('Failed to export DOCX. Please try again.')
    }
  }

  return { exportPDF, exportMd, exportHtml, exportDocx }
}
