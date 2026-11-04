import { useState, useEffect } from 'react'

import Button from '../ui/button.jsx'
import Input from '../ui/input.jsx'
import { toLocalDateString } from '../../utils/date-helpers.js'

const timeToMinutes = (timeStr) => {
  if (!timeStr || !timeStr.includes(':')) return 0
  const [hours, minutes] = timeStr.split(':').map(Number)
  return hours * 60 + minutes
}

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [date, setDate] = useState(() => {
    if (!initialData?.date) return toLocalDateString(new Date())
    return typeof initialData.date === 'string'
      ? initialData.date.split('T')[0]
      : toLocalDateString(initialData.date)
  })
  const [startTime, setStartTime] = useState(initialData?.startTime || '09:00')
  const [endTime, setEndTime] = useState(initialData?.endTime || '10:00')
  const [priority, setPriority] = useState(initialData?.priority || 'medium')
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '')
      setDescription(initialData.description || '')
      setDate(
        typeof initialData.date === 'string'
          ? initialData.date.split('T')[0]
          : toLocalDateString(initialData.date)
      )
      setStartTime(initialData.startTime || '09:00')
      setEndTime(initialData.endTime || '10:00')
      setPriority(initialData.priority || 'medium')
    } else {
      setTitle('')
      setDescription('')
      setDate(toLocalDateString(new Date()))
      setStartTime('09:00')
      setEndTime('10:00')
      setPriority('medium')
    }
    setError('')
  }, [initialData])

  const handleStartTimeChange = (val) => {
    setStartTime(val)
    if (val && endTime && timeToMinutes(val) >= timeToMinutes(endTime)) {
      setError('End time must be after start time')
    } else {
      setError('')
    }
  }

  const handleEndTimeChange = (val) => {
    setEndTime(val)
    if (startTime && val && timeToMinutes(startTime) >= timeToMinutes(val)) {
      setError('End time must be after start time')
    } else {
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const cleanTitle = title.trim()
    if (!cleanTitle) {
      setError('Task title is required')
      return
    }

    if (!date) {
      setError('Date is required')
      return
    }

    if (!startTime) {
      setError('Start time is required')
      return
    }

    if (!endTime) {
      setError('End time is required')
      return
    }

    if (timeToMinutes(startTime) >= timeToMinutes(endTime)) {
      setError('End time must be after start time')
      return
    }

    const [year, month, day] = date.split('-').map(Number)
    const normalizedDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0)).toISOString()

    try {
      await onSubmit({
        title: cleanTitle,
        description: description.trim(),
        date: normalizedDate,
        startTime,
        endTime,
        priority
      })
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save task')
    }
  }

  const isInvalid = Boolean(
    !title.trim() ||
    !date ||
    !startTime ||
    !endTime ||
    timeToMinutes(startTime) >= timeToMinutes(endTime)
  )

  return (
    <form onSubmit={handleSubmit} onReset={onCancel} className="flex flex-col gap-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3.5 py-2.5 rounded-xl font-medium">
          {error}
        </div>
      )}
      <Input
        label="Task title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
          if (error && e.target.value.trim()) setError('')
        }}
        placeholder="e.g. Design wireframes"
        required
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Start"
          type="time"
          value={startTime}
          onChange={(e) => handleStartTimeChange(e.target.value)}
          required
        />
        <Input
          label="Ends"
          type="time"
          value={endTime}
          onChange={(e) => handleEndTimeChange(e.target.value)}
          required
        />
      </div>
      <Input
        type="date"
        label="Set Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <div className="w-full flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D81E7] text-gray-800 resize-none h-24 text-sm"
          placeholder="Add description (optional)"
        />
      </div>
      <div>
        <div className="text-sm font-medium text-gray-700 mb-1.5">Priority</div>
        <div className="flex gap-2">
          {['low', 'medium', 'high'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`flex-1 py-2 rounded-xl text-sm capitalize font-medium transition cursor-pointer ${
                priority === p
                  ? p === 'high'
                    ? 'bg-red-500 text-white'
                    : p === 'medium'
                    ? 'bg-[#4D81E7] text-white'
                    : 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-2">
        <Button type="submit" disabled={isInvalid}>
          {initialData ? 'Update task' : 'Create task'}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm
