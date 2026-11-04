import Modal from '../ui/modal.jsx'
import TaskForm from './task-form.jsx'

const TaskModal = ({ isOpen, onClose, onSubmit, editingTask }) => {
  const handleSubmit = async (data) => {
    await onSubmit(data)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingTask ? 'Edit Task' : 'Add New Task'}
    >
      <TaskForm
        initialData={editingTask}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  )
}

export default TaskModal
