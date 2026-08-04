<template>
  <Editable
    id="edit-rename"
    class="min-w-0 max-w-full flex-1 overflow-hidden px-2 text-sm md:text-base"
    :title="data.curResumeName"
    :default="data.curResumeName"
    :on-value-commit="rename"
  />
</template>

<script lang="ts" setup>
const { data } = useDataStore();

const rename = (text: string) => {
  data.curResumeName = text;
  renameResume(data.curResumeId!, text);
};
</script>
