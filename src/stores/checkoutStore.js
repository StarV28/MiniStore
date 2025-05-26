import { defineStore } from 'pinia'
import { useHandlerItem } from './handlerItem'

export const useCheckoutStore = defineStore('checkout', () => {
  return {
    ...useHandlerItem(),
  }
})
