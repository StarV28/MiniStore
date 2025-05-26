// src/utils/axios.js
import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:3000/api/v1', // path to backend
  baseURL: 'https://backministore.onrender.com/api/v1', // path to backend
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export default api
