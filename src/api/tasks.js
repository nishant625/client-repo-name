import axios from 'axios'
import { API_BASE } from '../utils/constants.js'

export const fetchTasks = async (weekDate) => {
  const response = await axios.get(API_BASE, {
    params: weekDate ? { week: weekDate } : {}
  })
  return response.data
}

export const fetchTaskById = async (id) => {
  const response = await axios.get(`${API_BASE}/${id}`)
  return response.data
}

export const createTask = async (taskData) => {
  const response = await axios.post(API_BASE, taskData)
  return response.data
}

export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_BASE}/${id}`, taskData)
  return response.data
}

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`)
  return response.data
}

export const searchTasks = async (query) => {
  const response = await axios.get(`${API_BASE}/search`, {
    params: { q: query }
  })
  return response.data
}

export const fetchTaskSummary = async (weekDate) => {
  const response = await axios.get(`${API_BASE}/summary`, {
    params: weekDate ? { week: weekDate } : {}
  })
  return response.data
}

