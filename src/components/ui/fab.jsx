import { Plus } from 'lucide-react'

const Fab = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#4D81E7] text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
    >
      <Plus className="w-7 h-7" />
    </button>
  )
}

export default Fab

