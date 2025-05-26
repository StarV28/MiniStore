import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', () => {
  const language = ref(localStorage.getItem('lastLocale') || 'en')

  const setLanguage = (lang) => {
    language.value = lang
    localStorage.setItem('lastLocale', lang)
  }

  return { language, setLanguage }
})
