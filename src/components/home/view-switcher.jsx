import { ListTodo, CalendarRange, Clock } from 'lucide-react'

const ViewSwitcher = ({ currentView, onViewChange }) => {
  const views = [
    { id: 'list', label: 'List', icon: ListTodo },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'calendar', label: 'Calendar', icon: CalendarRange }
  ]

  return (
    <div className="flex bg-gray-100 p-1 rounded-xl mb-4">
      {views.map((v) => {
        const Icon = v.icon
        const isActive = currentView === v.id
        return (
          <button
            key={v.id}
            type="button"
            onClick={() => onViewChange(v.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
              isActive
                ? 'bg-white text-[#4D81E7] shadow-xs'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{v.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default ViewSwitcher

