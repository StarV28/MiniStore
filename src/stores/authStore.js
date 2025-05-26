import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../plugins/axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const dialog = ref(false)

  const login = async (data) => {
    loading.value = true
    try {
      const response = await api.post('/auth/login', data)
      token.value = response.data.token
      user.value = response.data.user

      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
    } finally {
      loading.value = false
    }
  }

  const register = async (data) => {
    loading.value = true
    try {
      const response = await api.post('/auth/register', data)
      token.value = response.data.token
      user.value = response.data.user

      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    dialog,
    user,
    token,
    error,
    loading,
    login,
    register,
    logout,
  }
})
