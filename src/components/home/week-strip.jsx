import { DAYS } from '../../utils/constants.js'
import { isSameDay } from '../../utils/date-helpers.js'

const WeekStrip = ({ weekDates = [], selectedDate, onSelectDate }) => {
  return (
    <div className="flex items-center justify-between gap-1 py-4">
      {weekDates.map((date) => {
        const isSelected = isSameDay(date, selectedDate)
        const dayIndex = date.getDay()
        const dayLabel = DAYS[dayIndex]
        const dateNumber = date.getDate()

        return (
          <div
            key={date.toISOString()}
            onClick={() => onSelectDate(date)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl cursor-pointer ${
              isSelected ? 'bg-[#4D81E7] text-white' : 'text-gray-500'
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
  )
}

export default WeekStrip
