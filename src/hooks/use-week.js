import { useState, useMemo } from 'react'

import { getWeekDates, getMondayOfWeek, toLocalDateString } from '../utils/date-helpers.js'

export const useWeek = () => {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [weekDates, setWeekDates] = useState(() => getWeekDates(new Date()))

  const mondayISO = useMemo(() => {
    const monday = getMondayOfWeek(selectedDate)
    return toLocalDateString(monday)
  }, [selectedDate])

  const selectDate = (date) => {
    const nextDate = new Date(date)
    setSelectedDate(nextDate)
    setWeekDates(getWeekDates(nextDate))
  }

  return {
    selectedDate,
    weekDates,
    selectDate,
    mondayISO
  }
}

export default useWeek
