import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});
apiClient.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
export const leadsApi = {
    create: (data) => apiClient.post('/api/leads', data),
    list: (adminPassword) => apiClient.get('/api/leads', {
        headers: { 'X-Admin-Password': adminPassword },
    }),
    get: (id, adminPassword) => apiClient.get(`/api/leads/${id}`, {
        headers: { 'X-Admin-Password': adminPassword },
    }),
    update: (id, data, adminPassword) => apiClient.put(`/api/leads/${id}`, data, {
        headers: { 'X-Admin-Password': adminPassword },
    }),
    delete: (id, adminPassword) => apiClient.delete(`/api/leads/${id}`, {
        headers: { 'X-Admin-Password': adminPassword },
    }),
};
export const analyticsApi = {
    summary: (adminPassword) => apiClient.get('/api/analytics/summary', {
        headers: { 'X-Admin-Password': adminPassword },
    }),
};
export const healthApi = {
    check: () => apiClient.get('/health'),
};
export default apiClient;
