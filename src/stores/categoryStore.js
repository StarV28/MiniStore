import { defineStore } from 'pinia'
import { useHandlerItem } from './handlerItem'

export const useCategoryStore = defineStore('category', () => {
  return {
    ...useHandlerItem(),
  }
})
