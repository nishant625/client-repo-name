import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, CheckSquare, Square, Pencil, Trash2 } from 'lucide-react'
import { isSameDay, isToday } from '../../utils/date-helpers.js'

const DAYS_HEADER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const CalendarView = ({ tasks = [], selectedDate, onSelectDate, onToggle, onEdit, onDelete }) => {
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date(selectedDate))

  const monthYearLabel = useMemo(() => {
    return currentMonthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }, [currentMonthDate])

  const calendarDays = useMemo(() => {
    const year = currentMonthDate.getFullYear()
    const month = currentMonthDate.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)

    const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7
    const totalDays = lastDayOfMonth.getDate()

    const days = []

    for (let i = firstDayIndex; i > 0; i--) {
      const prevDate = new Date(year, month, 1 - i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }

    for (let d = 1; d <= totalDays; d++) {
      const thisDate = new Date(year, month, d)
      days.push({ date: thisDate, isCurrentMonth: true })
    }

    const remaining = (7 - (days.length % 7)) % 7
    for (let i = 1; i <= remaining; i++) {
      const nextDate = new Date(year, month + 1, i)
      days.push({ date: nextDate, isCurrentMonth: false })
    }

    return days
  }, [currentMonthDate])

  const prevMonth = () => {
    setCurrentMonthDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonthDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
  }

  const selectedDayTasks = useMemo(() => {
    return tasks.filter((t) => isSameDay(t.date, selectedDate))
  }, [tasks, selectedDate])

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-800">{monthYearLabel}</h2>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 text-gray-400 hover:text-gray-700 cursor-pointer rounded-lg hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 text-gray-400 hover:text-gray-700 cursor-pointer rounded-lg hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {DAYS_HEADER.map((d) => (
            <div key={d} className="text-[11px] font-semibold text-gray-400 py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map(({ date, isCurrentMonth }) => {
            const isSelected = isSameDay(date, selectedDate)
            const isCurrentDay = isToday(date)
            const dayTasks = tasks.filter((t) => isSameDay(t.date, date))
            const hasTasks = dayTasks.length > 0

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => onSelectDate(date)}
                className={`flex flex-col items-center justify-center p-1.5 h-11 rounded-xl transition cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#4D81E7] text-white font-bold shadow-xs'
                    : isCurrentMonth
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-xs">{date.getDate()}</span>
                {hasTasks && (
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {dayTasks.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className={`w-1 h-1 rounded-full ${
                          isSelected
                            ? 'bg-white'
                            : t.priority === 'high'
                            ? 'bg-red-500'
                            : t.status === 'completed'
                            ? 'bg-emerald-500'
                            : 'bg-[#4D81E7]'
                        }`}
                      />
                    ))}
                  </div>
                )}
                {isCurrentDay && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-[#4D81E7] absolute bottom-1" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Tasks on {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </h3>
          <span className="text-xs text-gray-400">
            {selectedDayTasks.length} {selectedDayTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {selectedDayTasks.map((task) => {
            const isDone = task.status === 'completed'
            return (
              <div key={task._id} className="flex items-center gap-3 py-2.5">
                <button
                  type="button"
                  onClick={() => onToggle(task._id, task.status)}
                  className="cursor-pointer"
                >
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-[#4D81E7]" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-300" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-xs font-medium truncate ${
                      isDone ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </div>
                  {task.startTime && task.endTime && (
                    <div className="text-[10px] text-gray-400">
                      {task.startTime} - {task.endTime}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(task)}
                    className="p-1 text-gray-400 hover:text-[#4D81E7] cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(task._id)}
                    className="p-1 text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          })}

          {selectedDayTasks.length === 0 && (
            <div className="text-center py-6 text-gray-400 text-xs">
              No tasks for this date
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarView

