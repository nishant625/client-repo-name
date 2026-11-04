import { Search, Bell } from 'lucide-react'

const SearchBar = ({ onClick, pendingCount = 0, onBellClick }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        onClick={onClick}
        className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 gap-2 cursor-pointer hover:bg-gray-100/50 transition"
      >
        <Search className="w-5 h-5 text-gray-400" />
        <span className="text-gray-400 text-sm">Search for a task</span>
      </div>
      <button
        type="button"
        onClick={onBellClick}
        className="relative p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition cursor-pointer"
      >
        <Bell className="w-5 h-5" />
        {pendingCount > 0 && (
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>
    </div>
  )
}

export default SearchBar
