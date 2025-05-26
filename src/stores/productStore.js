import { defineStore } from 'pinia'
import { useHandlerItem } from './handlerItem'
import api from '@/plugins/axios'
import { ref } from 'vue'

export const useProductsStore = defineStore('product', () => {
  const error = ref(null)
  const baseURL = 'https://backministore.onrender.com'

  const getRating = async (data) => {
    try {
      const response = await api.post('/product/rating', data)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Error Rating'
      return null
    }
  }

  return {
    ...useHandlerItem(),
    getRating,
    baseURL,
  }
})
