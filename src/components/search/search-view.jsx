import { useState } from 'react'
import { ArrowLeft, Search, CheckSquare, Square, Trash2, Pencil, ChevronUp, ChevronDown } from 'lucide-react'

const SearchView = ({ onBack, tasks = [], onToggle, onEdit, onDelete }) => {
  const [query, setQuery] = useState('')

  const filtered = query === ''
    ? tasks
    : tasks.filter((t) => {
        const q = query.toLowerCase()
        const titleMatch = t.title?.toLowerCase().includes(q)
        const descMatch = t.description?.toLowerCase().includes(q)
        return titleMatch || descMatch
      })

  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)]">
      <div className="flex items-center gap-3 mb-4">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 text-gray-700 hover:text-black cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks..."
            autoFocus
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[#4D81E7] text-sm text-gray-800"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {filtered.map((task) => {
          const isCompleted = task.status === 'completed'
          return (
            <div
              key={task._id}
              className="flex items-center gap-3 py-3"
            >
              <button
                type="button"
                onClick={() => onToggle && onToggle(task._id, task.status)}
                className="cursor-pointer transition active:scale-90"
              >
                {isCompleted ? (
                  <CheckSquare className="w-5 h-5 text-[#4D81E7]" />
                ) : (
                  <Square className="w-5 h-5 text-gray-300" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <span
                  className={`text-sm block truncate ${
                    isCompleted ? 'line-through text-gray-400' : 'text-gray-900 font-medium'
                  }`}
                >
                  {task.title}
                </span>
                {task.description && (
                  <span className="text-xs text-gray-400 block truncate">
                    {task.description}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {onEdit && (
                  <button
                    type="button"
                    onClick={() => onEdit(task)}
                    className="p-1.5 text-gray-400 hover:text-[#4D81E7] cursor-pointer rounded-lg hover:bg-gray-100 transition"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(task._id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 cursor-pointer rounded-lg hover:bg-gray-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )
        })}
        {query !== '' && filtered.length === 0 && (
          <div className="text-center text-gray-400 py-12 text-sm">
            No matching tasks found
          </div>
        )}
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-auto">
        <div className="flex gap-2 text-gray-400">
          <ChevronUp className="w-5 h-5 cursor-pointer hover:text-gray-600" />
          <ChevronDown className="w-5 h-5 cursor-pointer hover:text-gray-600" />
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-[#4D81E7] font-semibold text-sm cursor-pointer hover:text-[#3D6BC7]"
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default SearchView
