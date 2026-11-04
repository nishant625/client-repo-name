import { useState } from 'react'

import OnboardingPage from './pages/onboarding-page.jsx'
import HomePage from './pages/home-page.jsx'
import SearchPage from './pages/search-page.jsx'
import TaskModal from './components/task/task-modal.jsx'
import ServerStatus from './components/ui/server-status.jsx'
import useWeek from './hooks/use-week.js'
import useTasks from './hooks/use-tasks.js'

const App = () => {
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('onboarded') ? 'home' : 'onboarding'
  })
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const { selectedDate, weekDates, selectDate, prevWeek, nextWeek, mondayISO } = useWeek()
  const { tasks, summary, addTask, editTask, removeTask, toggleTask } = useTasks(mondayISO)

  const handleOpenCreateModal = () => {
    setEditingTask(null)
    setIsTaskModalOpen(true)
  }

  const handleOpenEditModal = (task) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const handleModalSubmit = async (data) => {
    if (editingTask) {
      await editTask(editingTask._id, data)
    } else {
      await addTask(data)
    }
    setIsTaskModalOpen(false)
    setEditingTask(null)
  }

  return (
    <>
      <ServerStatus />

      {currentView === 'onboarding' && (
        <OnboardingPage onComplete={() => setCurrentView('home')} />
      )}

      {currentView === 'search' && (
        <SearchPage
          onBack={() => setCurrentView('home')}
          tasks={tasks}
          onToggle={toggleTask}
          onEdit={handleOpenEditModal}
          onDelete={removeTask}
        />
      )}

      {currentView !== 'onboarding' && currentView !== 'search' && (
        <HomePage
          selectedDate={selectedDate}
          weekDates={weekDates}
          onSelectDate={selectDate}
          onPrevWeek={prevWeek}
          onNextWeek={nextWeek}
          tasks={tasks}
          summary={summary}
          onToggleTask={toggleTask}
          onEditTask={handleOpenEditModal}
          onDeleteTask={removeTask}
          onOpenTaskModal={handleOpenCreateModal}
          onOpenSearch={() => setCurrentView('search')}
        />
      )}

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false)
          setEditingTask(null)
        }}
        editingTask={editingTask}
        onSubmit={handleModalSubmit}
      />
    </>
  )
}

export default App
