import { useState, useMemo } from 'react'

import SearchBar from '../components/home/search-bar.jsx'
import WeekStrip from '../components/home/week-strip.jsx'
import TaskSummaryCards from '../components/home/task-summary-cards.jsx'
import WeeklyProgressBar from '../components/home/weekly-progress-bar.jsx'
import TaskList from '../components/home/task-list.jsx'
import ViewSwitcher from '../components/home/view-switcher.jsx'
import TimelineView from '../components/timeline/timeline-view.jsx'
import CalendarView from '../components/calendar/calendar-view.jsx'
import Fab from '../components/ui/fab.jsx'
import { isSameDay } from '../utils/date-helpers.js'

const HomePage = ({
  selectedDate,
  weekDates,
  onSelectDate,
  onPrevWeek,
  onNextWeek,
  tasks,
  summary,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onOpenTaskModal,
  onOpenSearch
}) => {
  const [activeTab, setActiveTab] = useState('list')
  const [isWeekExpanded, setIsWeekExpanded] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState('')

  const todayTasks = useMemo(() => {
    return tasks.filter((t) => isSameDay(t.date, selectedDate))
  }, [tasks, selectedDate])

  const displayedTasks = isWeekExpanded ? tasks : todayTasks

  const handleBellClick = () => {
    const openCount = summary?.open || 0
    setNotificationMsg(
      openCount > 0
        ? `You have ${openCount} open ${openCount === 1 ? 'task' : 'tasks'} for this week.`
        : 'All tasks are complete! Great job.'
    )
    setTimeout(() => setNotificationMsg(''), 3000)
  }

  return (
    <div className="min-h-screen bg-white p-4 pb-28 max-w-md mx-auto relative">
      {notificationMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs px-4 py-2 rounded-xl shadow-lg animate-fade-in">
          {notificationMsg}
        </div>
      )}

      <SearchBar
        onClick={onOpenSearch}
        pendingCount={summary?.open || 0}
        onBellClick={handleBellClick}
      />

      <WeekStrip
        weekDates={weekDates}
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          onSelectDate(date)
          setIsWeekExpanded(false)
        }}
        onPrevWeek={onPrevWeek}
        onNextWeek={onNextWeek}
      />

      <div className="my-3">
        <TaskSummaryCards
          summary={summary}
          isExpanded={isWeekExpanded}
          onToggleExpand={() => setIsWeekExpanded((prev) => !prev)}
        />
      </div>

      <div className="my-3">
        <WeeklyProgressBar summary={summary} />
      </div>

      <div className="mt-4">
        <ViewSwitcher
          currentView={activeTab}
          onViewChange={setActiveTab}
        />

        {activeTab === 'list' && (
          <TaskList
            tasks={displayedTasks}
            isWeekly={isWeekExpanded}
            onToggle={onToggleTask}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onViewAll={() => setIsWeekExpanded((prev) => !prev)}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineView
            tasks={todayTasks}
            selectedDate={selectedDate}
            onEditTask={onEditTask}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            tasks={tasks}
            selectedDate={selectedDate}
            onSelectDate={(date) => {
              onSelectDate(date)
              setIsWeekExpanded(false)
            }}
            onToggle={onToggleTask}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        )}
      </div>

      <Fab onClick={onOpenTaskModal} />
    </div>
  )
}

export default HomePage
