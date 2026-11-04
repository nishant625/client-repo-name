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

  const prevWeek = () => {
    const nextDate = new Date(selectedDate)
    nextDate.setDate(nextDate.getDate() - 7)
    selectDate(nextDate)
  }

  const nextWeek = () => {
    const nextDate = new Date(selectedDate)
    nextDate.setDate(nextDate.getDate() + 7)
    selectDate(nextDate)
  }

  return {
    selectedDate,
    weekDates,
    selectDate,
    prevWeek,
    nextWeek,
    mondayISO
  }
}

export default useWeek
