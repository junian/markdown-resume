import type { NuxtI18nOptions } from '@nuxtjs/i18n'
import { siteConfig } from './siteConfig'

export const i18n: NuxtI18nOptions = {
  baseUrl: siteConfig.url,
  defaultLocale: 'en',
  strategy: 'prefix_and_default',
  locales: [
    {
      code: 'en',
      name: 'English',
      icon: 'icon-park-outline:english',
      file: 'en.yaml',
    },
    {
      code: 'id',
      name: 'Bahasa Indonesia',
      icon: 'circle-flags:id',
      file: 'id.yaml',
    },
    {
      code: 'sp',
      name: 'Spanish',
      icon: 'material-symbols:language-spanish',
      file: 'sp.yaml',
    },
    {
      code: 'zh-cn',
      name: '简体中文',
      icon: 'icon-park-outline:chinese',
      file: 'zh-cn.yaml',
    },
  ],
  langDir: '../app/i18n',
  compilation: {
    strictMessage: false,
  },
}
