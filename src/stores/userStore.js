import { defineStore } from 'pinia'
import { useHandlerItem } from './handlerItem'

export const useUserStore = defineStore('user', () => {
  return {
    ...useHandlerItem(),
  }
})
