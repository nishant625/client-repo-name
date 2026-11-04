import { useState, useEffect, useCallback } from 'react'

import { fetchTasks, fetchTaskSummary, createTask, updateTask, deleteTask } from '../api/tasks.js'
import { STATUSES } from '../utils/constants.js'

export const useTasks = (weekDate) => {
  const [tasks, setTasks] = useState([])
  const [summary, setSummary] = useState({ open: 0, completed: 0, total: 0 })
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const [tasksData, summaryData] = await Promise.all([
        fetchTasks(weekDate),
        fetchTaskSummary(weekDate)
      ])
      setTasks(Array.isArray(tasksData) ? tasksData : (tasksData?.tasks || []))
      setSummary(summaryData || { open: 0, completed: 0, total: 0 })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [weekDate])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addTask = async (taskData) => {
    const result = await createTask(taskData)
    await refresh()
    return result
  }

  const editTask = async (id, taskData) => {
    const result = await updateTask(id, taskData)
    await refresh()
    return result
  }

  const removeTask = async (id) => {
    const result = await deleteTask(id)
    await refresh()
    return result
  }

  const toggleTask = async (id, currentStatus) => {
    const nextStatus = currentStatus === STATUSES.COMPLETED ? STATUSES.OPEN : STATUSES.COMPLETED
    const result = await updateTask(id, { status: nextStatus })
    await refresh()
    return result
  }

  return {
    tasks,
    summary,
    loading,
    addTask,
    editTask,
    removeTask,
    toggleTask,
    refresh
  }
}

export default useTasks

