<template>
  <div v-bind="api.rootProps" class="w-full">
    <div
      v-bind="api.dropzoneProps"
      class="py-12 hover:bg-darker-c cursor-pointer transition-colors"
      border="~ c dashed rounded"
    >
      <input v-bind="api.hiddenInputProps" />
      <div class="flex-center flex-col gap-2 text-sm text-light-c">
        <span i-ic:round-upload-file text-3xl />
        <span>{{ $t("images.from_local") }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as fileUpload from "@zag-js/file-upload";
import { normalizeProps, useMachine } from "@zag-js/vue";

const emit = defineEmits<{
  (e: "uploaded"): void;
}>();

const toast = useToast();

const [state, send] = useMachine(
  fileUpload.machine({
    id: "image-upload",
    accept: "image/*",
    onFileAccept: async ({ files }) => {
      for (const file of files) {
        await saveImage(file.name, file, file.type, file.size);
        toast.uploadImage(file.name);
      }
      emit("uploaded");
    }
  })
);

const api = computed(() => fileUpload.connect(state.value, send, normalizeProps));
</script>
