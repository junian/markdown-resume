<template>
  <ToolItem :text="$t('toolbar.migrate_iconify.text')" icon="i-tabler:replace">
    <div bg="c lg:dark-c" p="y-2 x-3" rounded>
      {{ $t("toolbar.migrate_iconify.desc") }}
    </div>

    <button
      class="rect-btn mt-3 ml-auto text-white"
      bg="blue-500 hover:(blue-600 dark:blue-400)"
      @click="migrate"
    >
      <span i-tabler:transform />
      <span>{{ $t("toolbar.migrate_iconify.btn") }}</span>
    </button>
  </ToolItem>
</template>

<script lang="ts" setup>
const { data } = useDataStore();
const toast = useToast();

const migrateLegacyIconify = (markdown: string) => {
  let count = 0;

  const text = markdown.replace(
    /<span\b([^>]*)>\s*<\/span>/gi,
    (original, attributes: string) => {
      const classAttribute = attributes.match(/\bclass\s*=\s*(["'])(.*?)\1/i);
      const iconAttribute = attributes.match(/\bdata-icon\s*=\s*(["'])(.*?)\1/i);

      if (!classAttribute || !iconAttribute) return original;

      const classes = classAttribute[2].split(/\s+/).filter(Boolean);
      if (!classes.includes("iconify")) return original;

      const remainingClasses = classes.filter((name) => name !== "iconify");
      let remainingAttributes = attributes
        .replace(classAttribute[0], "")
        .replace(iconAttribute[0], "")
        .replace(/\s*data-inline\s*=\s*(["']).*?\1/gi, "")
        .trim();

      if (remainingClasses.length > 0) {
        remainingAttributes = `${remainingAttributes} class="${remainingClasses.join(" ")}"`.trim();
      }

      count += 1;
      const suffix = remainingAttributes ? ` ${remainingAttributes}` : "";
      return `<iconify-icon icon="${iconAttribute[2]}"${suffix}></iconify-icon>`;
    }
  );

  return { text, count };
};

const migrate = async () => {
  const result = migrateLegacyIconify(data.mdContent);

  if (result.count > 0) {
    setResumeMd(result.text);
    await saveCurrentResume(false);
  }

  toast.migrateIconify(result.count);
};
</script>
