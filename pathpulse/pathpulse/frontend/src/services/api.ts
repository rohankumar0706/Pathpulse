import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export const api = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const { refreshToken, setAuth, clearAuth } = useAuthStore.getState()
      try {
        const { data } = await axios.post(
          `${API_BASE}/api/v1/auth/refresh`,
          {},
          { headers: { 'X-Refresh-Token': refreshToken } }
        )
        setAuth(data.user, data.accessToken, data.refreshToken)
        original.headers.Authorization = `Bearer ${data.accessToken}`
        return api(original)
      } catch {
        clearAuth()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// ── API Methods ───────────────────────────────────────────────────────

export const authApi = {
  login:    (data: { usernameOrEmail: string; password: string }) =>
              api.post('/auth/login', data),
  register: (data: { username: string; email: string; password: string; fullName?: string }) =>
              api.post('/auth/register', data),
  logout:   () => api.post('/auth/logout'),
}

export const journeyApi = {
  list:   (page = 0, size = 20) => api.get(`/journeys?page=${page}&size=${size}`),
  get:    (id: string)          => api.get(`/journeys/${id}`),
  start:  (data: object)        => api.post('/journeys', data),
  end:    (id: string)          => api.put(`/journeys/${id}/end`),
  pause:  (id: string)          => api.put(`/journeys/${id}/pause`),
  resume: (id: string)          => api.put(`/journeys/${id}/resume`),
  delete: (id: string)          => api.delete(`/journeys/${id}`),
  feed:   (page = 0)            => api.get(`/journeys/feed?page=${page}`),
}

export const analyticsApi = {
  summary: () => api.get('/analytics/summary'),
  heatmap: () => api.get('/analytics/heatmap'),
  fuel:    () => api.get('/analytics/fuel'),
}

export const socialApi = {
  follow:    (userId: string) => api.post(`/social/follow/${userId}`),
  unfollow:  (userId: string) => api.delete(`/social/follow/${userId}`),
  followers: (userId: string) => api.get(`/social/followers/${userId}`),
  following: (userId: string) => api.get(`/social/following/${userId}`),
}
