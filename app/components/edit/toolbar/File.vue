<template>
  <ToolItem
    :text="$t('toolbar.file.text')"
    icon="i-carbon:import-export"
  >
    <AppDialog
      id="import-md"
      :title="$t('import.title')"
      icon="i-mdi:upload"
      box-class="w-full md:w-96"
    >
      <template #button>
        <li
          class="dropdown-li space-x-1.5 rounded"
          role="button"
        >
          <UIcon
            name="i-mdi:upload"
            class="text-base"
          />
          <span>{{ $t("toolbar.file.import") }}</span>
        </li>
      </template>

      <template #content="{ close }">
        <ImportDialogContent :close="close" />
      </template>
    </AppDialog>

    <hr class="border-t border-dashed border-c my-1">

    <li
      class="dropdown-li space-x-1.5 rounded"
      role="button"
      @click="exportPDF"
    >
      <UIcon
        name="i-mdi:file-pdf"
        class="text-base"
      />
      <span>{{ $t("toolbar.file.export_pdf") }}</span>
    </li>

    <li
      class="dropdown-li space-x-1.5 rounded"
      role="button"
      @click="exportMd"
    >
      <UIcon
        name="i-ri:markdown-fill"
        class="text-base"
      />
      <span>{{ $t("toolbar.file.export_md") }}</span>
    </li>

    <li
      class="dropdown-li space-x-1.5 rounded"
      role="button"
      @click="exportHtml"
    >
      <UIcon
        name="i-mdi:language-html5"
        class="text-base"
      />
      <span>{{ $t("toolbar.file.export_html") }}</span>
    </li>

    <li
      class="dropdown-li space-x-1.5 rounded"
      role="button"
      @click="exportDocx"
    >
      <UIcon
        name="i-mdi:file-word"
        class="text-base"
      />
      <span>{{ $t("toolbar.file.export_docx") }}</span>
    </li>
  </ToolItem>
</template>

<script lang="ts" setup>
const { exportPDF, exportMd, exportHtml, exportDocx } = useResumeExport()
</script>
