import { Search, Bell } from 'lucide-react'

const SearchBar = ({ onClick }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        onClick={onClick}
        className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 gap-2 cursor-pointer"
      >
        <Search className="w-5 h-5 text-gray-400" />
        <span className="text-gray-400 text-sm">Search for a task</span>
      </div>
      <button
        type="button"
        className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition cursor-pointer"
      >
        <Bell className="w-5 h-5" />
      </button>
    </div>
  )
}

export default SearchBar
