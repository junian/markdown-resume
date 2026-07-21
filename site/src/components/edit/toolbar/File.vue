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

    <li class="dropdown-li space-x-1.5 rounded" role="button" @click="exportDocx">
      <span i-mdi:file-word text-base />
      <span>{{ $t("toolbar.file.export_docx") }}</span>
    </li>
  </ToolItem>
</template>

<script lang="ts" setup>
const { exportPDF, exportMd, exportHtml, exportDocx } = useResumeExport();
</script>
