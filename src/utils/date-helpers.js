export const toLocalDateString = (d = new Date()) => {
  const date = new Date(d)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const getMondayOfWeek = (date = new Date()) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + diff, 0, 0, 0, 0)
}

export const getWeekDates = (referenceDate = new Date()) => {
  const monday = getMondayOfWeek(referenceDate)
  const week = []
  for (let i = 0; i < 7; i++) {
    week.push(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i, 0, 0, 0, 0))
  }
  return week
}

export const formatDate = (date) => {
  const d = new Date(date)
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long' })
  const day = d.getDate()
  const month = d.toLocaleDateString('en-US', { month: 'long' })
  return `${weekday} ${day}, ${month}`
}

export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false
  const s1 = typeof date1 === 'string' && date1.includes('T') ? date1.split('T')[0] : toLocalDateString(date1)
  const s2 = typeof date2 === 'string' && date2.includes('T') ? date2.split('T')[0] : toLocalDateString(date2)
  return s1 === s2
}

export const isToday = (date) => {
  return isSameDay(date, new Date())
}
