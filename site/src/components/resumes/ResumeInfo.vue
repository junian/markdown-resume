<template>
  <div class="mt-2 w-44 space-y-0.5">
    <Editable
      :id="`resumes-rename-${resume.id}`"
      class="w-full text-sm text-dark-c"
      :default="resume.name"
      :on-value-commit="rename"
      text-align="left"
      icon-position="left"
    />
    <div v-if="updated" class="hstack gap-1.5 text-xs text-lighter-c">
      <span i-ic:round-update />
      {{ updated }}
    </div>
    <div class="hstack gap-1.5 text-xs text-lighter-c">
      <span i-ic:round-add-circle-outline />
      {{ created }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ResumeListItem } from "~/types";

const props = defineProps<{
  resume: ResumeListItem;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const rename = async (text: string) => {
  await renameResume(props.resume.id, text);
  emit("update");
};

const formatDate = (date?: string) => {
  if (!date) return;
  const d = new Date(parseInt(date));
  const month = d.toLocaleDateString(undefined, { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${month} ${day}, ${year} ${hours}:${minutes}`;
};

const created = computed(() => formatDate(props.resume.id));
const updated = computed(() => formatDate(props.resume.update));
</script>
