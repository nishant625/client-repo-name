import { useMemo } from 'react'
import { isToday } from '../../utils/date-helpers.js'

const START_HOUR = 6
const END_HOUR = 23
const HOUR_HEIGHT = 56

const timeToMinutes = (timeStr) => {
  if (!timeStr || !timeStr.includes(':')) return 0
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

const TimelineView = ({ tasks = [], selectedDate, onEditTask }) => {
  const hours = useMemo(() => {
    const list = []
    for (let h = START_HOUR; h <= END_HOUR; h++) {
      list.push(`${String(h).padStart(2, '0')}:00`)
    }
    return list
  }, [])

  const currentMinutesOffset = useMemo(() => {
    if (!isToday(selectedDate)) return null
    const now = new Date()
    const currentMins = now.getHours() * 60 + now.getMinutes()
    const startMins = START_HOUR * 60
    const endMins = END_HOUR * 60
    if (currentMins < startMins || currentMins > endMins) return null
    return ((currentMins - startMins) / 60) * HOUR_HEIGHT
  }, [selectedDate])

  const priorityStyles = {
    high: 'bg-red-50 border-l-4 border-red-500 text-red-950 hover:bg-red-100/70',
    medium: 'bg-blue-50 border-l-4 border-[#4D81E7] text-blue-950 hover:bg-blue-100/70',
    low: 'bg-emerald-50 border-l-4 border-emerald-500 text-emerald-950 hover:bg-emerald-100/70'
  }

  return (
    <div className="relative border border-gray-100 rounded-2xl p-3 bg-white shadow-xs max-h-[520px] overflow-y-auto">
      <div className="relative" style={{ height: (hours.length - 1) * HOUR_HEIGHT }}>
        {hours.map((hour, idx) => (
          <div
            key={hour}
            className="absolute left-0 right-0 flex items-center gap-3"
            style={{ top: idx * HOUR_HEIGHT }}
          >
            <span className="text-[11px] font-medium text-gray-400 w-11 shrink-0">
              {hour}
            </span>
            <div className="flex-1 border-t border-gray-100" />
          </div>
        ))}

        {currentMinutesOffset !== null && (
          <div
            className="absolute left-11 right-0 flex items-center z-20 pointer-events-none"
            style={{ top: currentMinutesOffset }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-1.5" />
            <div className="flex-1 border-t-2 border-red-500" />
          </div>
        )}

        {tasks.map((task) => {
          if (!task.startTime || !task.endTime) return null
          const startMins = timeToMinutes(task.startTime)
          const endMins = timeToMinutes(task.endTime)
          const baseMins = START_HOUR * 60

          const top = Math.max(0, ((startMins - baseMins) / 60) * HOUR_HEIGHT)
          const height = Math.max(28, ((endMins - startMins) / 60) * HOUR_HEIGHT)

          const styleClass = priorityStyles[task.priority || 'medium']
          const isDone = task.status === 'completed'

          return (
            <div
              key={task._id}
              onClick={() => onEditTask(task)}
              className={`absolute left-14 right-2 rounded-xl p-2.5 shadow-xs cursor-pointer transition z-10 overflow-hidden flex flex-col justify-between ${styleClass} ${
                isDone ? 'opacity-60' : ''
              }`}
              style={{ top, height }}
            >
              <div className="flex items-start justify-between gap-1">
                <span
                  className={`text-xs font-semibold truncate ${
                    isDone ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.title}
                </span>
                <span className="text-[10px] font-medium opacity-75 shrink-0">
                  {task.startTime} - {task.endTime}
                </span>
              </div>
              {height > 44 && task.description && (
                <p className="text-[11px] opacity-75 truncate mt-0.5">
                  {task.description}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-10 text-gray-400 text-xs">
          No tasks scheduled for this day
        </div>
      )}
    </div>
  )
}

export default TimelineView

