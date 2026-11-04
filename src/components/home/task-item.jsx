import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckSquare, Square, Trash2, Pencil } from 'lucide-react'

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isCompleted = task.status === 'completed'

  const priorityColor = {
    high: 'text-red-500 bg-red-50',
    medium: 'text-[#4D81E7] bg-blue-50',
    low: 'text-emerald-500 bg-emerald-50'
  }[task.priority || 'medium']

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute inset-y-0 right-0 flex items-center justify-end pr-2 bg-red-500 text-white w-full rounded-xl">
        <button
          type="button"
          onClick={() => onDelete(task._id)}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition active:scale-95"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: -90, right: 0 }}
        dragElastic={0.15}
        animate={{ x: isOpen ? -90 : 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x < -40) {
            setIsOpen(true)
          } else {
            setIsOpen(false)
          }
        }}
        className="bg-white relative z-10"
      >
        <div className="flex items-center gap-3 py-3 border-b border-gray-100">
          <button
            type="button"
            onClick={() => onToggle(task._id, task.status)}
            className="cursor-pointer transition active:scale-90"
          >
            {isCompleted ? (
              <CheckSquare className="w-5 h-5 text-[#4D81E7]" />
            ) : (
              <Square className="w-5 h-5 text-gray-300" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <div
              className={`text-sm font-medium truncate ${
                isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {task.title}
            </div>
            {task.startTime && task.endTime && (
              <div className="text-xs text-gray-400 mt-0.5">
                {task.startTime} - {task.endTime}
              </div>
            )}
          </div>
          {task.priority && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${priorityColor}`}>
              {task.priority}
            </span>
          )}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="p-1.5 text-gray-400 hover:text-[#4D81E7] cursor-pointer transition rounded-lg hover:bg-gray-50"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(task._id)}
              className="p-1.5 text-gray-400 hover:text-red-500 cursor-pointer transition rounded-lg hover:bg-gray-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default TaskItem
