const BACKEND_URL = import.meta.env.VITE_API_URL || ''

export const API_BASE = BACKEND_URL
  ? `${BACKEND_URL.replace(/\/+$/, '')}/api/tasks`
  : '/api/tasks'

export const HEALTH_URL = BACKEND_URL
  ? `${BACKEND_URL.replace(/\/+$/, '')}/api/health`
  : '/api/health'

export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
}

export const STATUSES = {
  OPEN: 'open',
  COMPLETED: 'completed'
}

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
