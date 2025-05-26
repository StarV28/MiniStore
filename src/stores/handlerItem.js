import api from '@/plugins/axios'
import { ref } from 'vue'

export const useHandlerItem = () => {
  const error = ref(null)

  const getItems = async (path) => {
    try {
      const response = await api.get(`/${path}`)
      return response
    } catch (err) {
      console.error('Error found items', err)
      error.value = err.response?.data?.message || 'Items not found'
      return null
    }
  }

  const getByIdItem = async (path, id) => {
    try {
      const response = await api.get(`/${path}/${id}`)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Item by ID not found'
      return null
    }
  }

  const getByIdItemS = async (path, data) => {
    try {
      const response = await api.post(`/${path}`, data)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Item by ID not found'
      return null
    }
  }

  const submitPasswordRecovery = async (path, data) => {
    try {
      const response = await api.post(`/${path}`, data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'This Email not found'
      return null
    }
  }

  const getProductsPagination = async (path, options) => {
    try {
      const response = await api.post(`/${path}`, { params: options })
      return response
    } catch (err) {
      console.error('Error found product', err)
      error.value = err.response?.data?.message || 'Items not found'
      return null
    }
  }

  const create = async (path, data) => {
    try {
      const response = await api.post(`/${path}`, { data: data })
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Error create'
    }
  }

  const updateById = async (path, data) => {
    try {
      const response = await api.post(`/${path}`, { data: data })
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Not found'
    }
  }

  const deleteByID = async (path, id) => {
    try {
      const result = await api.delete(`/${path}/${id}`)
      return result
    } catch (err) {
      error.value = err.response?.data?.message || 'Error delete'
    }
  }

  return {
    getItems,
    getByIdItem,
    getProductsPagination,
    updateById,
    deleteByID,
    getByIdItemS,
    create,
    error,
    submitPasswordRecovery,
  }
}
