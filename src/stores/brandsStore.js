import { defineStore } from 'pinia'
import { useHandlerItem } from './handlerItem'

export const useBrandsStore = defineStore('brands', () => {
  return {
    ...useHandlerItem(),
  }
})
