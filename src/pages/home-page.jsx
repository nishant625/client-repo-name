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

  const todayTasks = useMemo(() => {
    return tasks.filter((t) => isSameDay(t.date, selectedDate))
  }, [tasks, selectedDate])

  const displayedTasks = isWeekExpanded ? tasks : todayTasks

  return (
    <div className="min-h-screen bg-white p-4 pb-28 max-w-md mx-auto relative">
      <SearchBar onClick={onOpenSearch} />

      <WeekStrip
        weekDates={weekDates}
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          onSelectDate(date)
          setIsWeekExpanded(false)
        }}
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
