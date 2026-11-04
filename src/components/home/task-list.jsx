import TaskItem from './task-item.jsx'

const TaskList = ({ tasks = [], onToggle, onEdit, onDelete, onViewAll, isWeekly = false }) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-900 text-base">
          {isWeekly ? 'Tasks This Week' : 'Tasks Today'}
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[#4D81E7] hover:text-[#3D6BC7] cursor-pointer"
        >
          {isWeekly ? 'Show Today' : 'View All Week'}
        </button>
      </div>

      <div className="space-y-1">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center text-gray-400 py-10 text-xs">
          {isWeekly ? 'No tasks scheduled for this week' : 'No tasks scheduled for today'}
        </div>
      )}
    </div>
  )
}

export default TaskList
