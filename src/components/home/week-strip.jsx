import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DAYS } from '../../utils/constants.js'
import { isSameDay } from '../../utils/date-helpers.js'

const WeekStrip = ({ weekDates = [], selectedDate, onSelectDate, onPrevWeek, onNextWeek }) => {
  const monthLabel = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs font-bold text-gray-700 tracking-wide">
          {monthLabel}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrevWeek}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNextWeek}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-1">
        {weekDates.map((date) => {
          const isSelected = isSameDay(date, selectedDate)
          const dayIndex = date.getDay()
          const dayLabel = DAYS[dayIndex]
          const dateNumber = date.getDate()

          return (
            <div
              key={date.toISOString()}
              onClick={() => onSelectDate(date)}
              className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl cursor-pointer transition ${
                isSelected ? 'bg-[#4D81E7] text-white shadow-xs' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className={`text-xs ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                {dayLabel}
              </span>
              <span className="text-sm font-semibold">
                {dateNumber}
              </span>
              {isSelected && <span className="w-1 h-1 rounded-full bg-white" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeekStrip
