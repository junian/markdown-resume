<template>
  <ToolItem
    :text="$t('toolbar.migrate_iconify.text')"
    icon="i-tabler:replace"
  >
    <div class="bg-c lg:bg-dark-c py-2 px-3 rounded">
      {{ $t("toolbar.migrate_iconify.desc") }}
    </div>

    <UButton
      class="mt-3 ml-auto text-white"
      icon="i-tabler:transform"
      @click="migrate"
    >
      {{ $t("toolbar.migrate_iconify.btn") }}
    </UButton>
  </ToolItem>
</template>

<script lang="ts" setup>
import { migrateIconify } from '~/utils/iconifyMigration'

const { data } = useDataStore()
const toast = useAppToast()

const migrate = async () => {
  const result = migrateIconify(data.mdContent)

  if (result.count > 0) {
    setResumeMd(result.text)
    await saveCurrentResume(false)
  }

  toast.migrateIconify(result.count)
}
</script>
