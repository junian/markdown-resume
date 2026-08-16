<template>
  <ToolItem
    :text="$t('toolbar.correct_case.text')"
    icon="i-icon-park-outline:check-correct"
  >
    <div class="bg-c lg:bg-dark-c py-2 px-3 rounded">
      {{ $t('toolbar.correct_case.desc') }}<br>
      {{ $t('toolbar.correct_case.note') }}
    </div>

    <UButton
      color="secondary"
      class="mt-3 ml-auto text-white"
      icon="i-carbon:rocket"
      @click="correct"
    >
      {{ $t("toolbar.correct_case.btn") }}
    </UButton>
  </ToolItem>
</template>

<script lang="ts" setup>
import { correctCase } from '~/libs/correct-case'

const { data } = useDataStore()
const toast = useAppToast()

const correct = async () => {
  const md = data.mdContent
  const result = await correctCase(md)

  setResumeMd(result.text)

  const corrected = result.correctedWords ? result.correctedWords.length : true
  toast.correct(corrected)
}
</script>
