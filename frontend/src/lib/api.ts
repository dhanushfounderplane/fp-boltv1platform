import axios, { AxiosInstance, AxiosError } from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const leadsApi = {
  create: (data: any) => apiClient.post('/api/leads', data),
  list: (adminPassword: string) =>
    apiClient.get('/api/leads', {
      headers: { 'X-Admin-Password': adminPassword },
    }),
  get: (id: string, adminPassword: string) =>
    apiClient.get(`/api/leads/${id}`, {
      headers: { 'X-Admin-Password': adminPassword },
    }),
  update: (id: string, data: any, adminPassword: string) =>
    apiClient.put(`/api/leads/${id}`, data, {
      headers: { 'X-Admin-Password': adminPassword },
    }),
  delete: (id: string, adminPassword: string) =>
    apiClient.delete(`/api/leads/${id}`, {
      headers: { 'X-Admin-Password': adminPassword },
    }),
}

export const analyticsApi = {
  summary: (adminPassword: string) =>
    apiClient.get('/api/analytics/summary', {
      headers: { 'X-Admin-Password': adminPassword },
    }),
}

export const healthApi = {
  check: () => apiClient.get('/health'),
}

export default apiClient
