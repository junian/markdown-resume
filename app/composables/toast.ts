export const useAppToast = () => {
  const toast = useToast()
  const { t } = useNuxtApp().$i18n

  const save = () => {
    toast.add({
      description: t('notification.save'),
      color: 'success',
    })
  }

  const switchResume = (msg: string) => {
    toast.add({
      description: t('notification.switch', { msg }),
      color: 'info',
    })
  }

  const deleteResume = (msg: string) => {
    toast.add({
      description: t('notification.delete', { msg }),
      color: 'error',
    })
  }

  const newResume = () => {
    toast.add({
      description: t('notification.new'),
      color: 'success',
    })
  }

  const duplicate = (msg: string, newName: string) => {
    toast.add({
      description: t('notification.duplicate', {
        old: msg,
        new: newName,
      }),
      color: 'success',
    })
  }

  const correct = (msg: true | number) => {
    if (msg === true) {
      toast.add({
        description: t('notification.correct.no'),
        color: 'info',
      })
    }
    else {
      toast.add({
        description: t('notification.correct.yes', { num: msg }),
        color: 'success',
      })
    }
  }

  const migrateIconify = (count: number) => {
    toast.add({
      description: t(
        count > 0
          ? 'notification.iconify_migration.yes'
          : 'notification.iconify_migration.no',
        { count },
      ),
      color: count > 0 ? 'success' : 'info',
    })
  }

  const importResume = (msg: boolean) => {
    if (msg) {
      toast.add({
        description: t('notification.import.yes'),
        color: 'success',
      })
    }
    else {
      toast.add({
        description: t('notification.import.no'),
        color: 'error',
      })
    }
  }

  const uploadImage = (msg: string) => {
    toast.add({
      description: t('images.uploaded', { msg }),
      color: 'success',
    })
  }

  const deleteImage = (msg: string) => {
    toast.add({
      description: t('images.deleted', { msg }),
      color: 'error',
    })
  }

  const copyImageUrl = () => {
    toast.add({
      description: t('images.copied'),
      color: 'success',
    })
  }

  return {
    save,
    switch: switchResume,
    delete: deleteResume,
    new: newResume,
    duplicate,
    correct,
    migrateIconify,
    import: importResume,
    uploadImage,
    deleteImage,
    copyImageUrl,
  }
}
