import { createI18n } from 'vue-i18n'
import localesEN from '@/locales/en.json'
import localesUA from '@/locales/ua.json'
import localesDE from '@/locales/de.json'

const i18n = createI18n({
  legacy: false, //for Composition API
  locale: localStorage.getItem('lastLocale') || import.meta.env.VITE_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    en: localesEN,
    ua: localesUA,
    de: localesDE,
  },
  globalInjection: true,
})

export default i18n
