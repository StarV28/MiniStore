import { defineStore } from 'pinia'
import { useHandlerItem } from './handlerItem'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const resSearch = ref([])
  const isActive = ref(false)
  return {
    ...useHandlerItem(),
    resSearch,
    isActive,
  }
})
