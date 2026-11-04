import { CheckSquare, XSquare, ChevronDown, ChevronUp } from 'lucide-react'

const TaskSummaryCards = ({ summary, isExpanded, onToggleExpand }) => {
  const completedCount = String(summary?.completed ?? 0).padStart(2, '0')
  const pendingCount = String(summary?.open ?? 0).padStart(2, '0')

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onToggleExpand}
          className={`bg-blue-50 rounded-2xl p-4 text-left transition cursor-pointer hover:bg-blue-100/70 border ${
            isExpanded ? 'border-[#4D81E7] shadow-sm ring-2 ring-[#4D81E7]/20' : 'border-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            <CheckSquare className="w-5 h-5 text-[#4D81E7]" />
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <div className="text-sm font-medium text-gray-700 mt-2">Task Complete</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">{completedCount}</span>
            <span className="text-xs text-gray-400">This Week</span>
          </div>
        </button>

        <button
          type="button"
          onClick={onToggleExpand}
          className={`bg-red-50 rounded-2xl p-4 text-left transition cursor-pointer hover:bg-red-100/70 border ${
            isExpanded ? 'border-red-400 shadow-sm ring-2 ring-red-400/20' : 'border-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            <XSquare className="w-5 h-5 text-red-500" />
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <div className="text-sm font-medium text-gray-700 mt-2">Task Pending</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">{pendingCount}</span>
            <span className="text-xs text-gray-400">This Week</span>
          </div>
        </button>
      </div>

      <div className="flex justify-between items-center px-1">
        <button
          type="button"
          onClick={onToggleExpand}
          className="text-xs text-[#4D81E7] font-medium hover:underline cursor-pointer"
        >
          {isExpanded ? '← Show selected day only' : 'Tap cards to view all tasks for this week →'}
        </button>
      </div>
    </div>
  )
}

export default TaskSummaryCards
