import SearchView from '../components/search/search-view.jsx'

const SearchPage = ({ onBack, tasks, onToggle, onEdit, onDelete }) => {
  return (
    <div className="min-h-screen bg-white p-4 max-w-md mx-auto">
      <SearchView
        onBack={onBack}
        tasks={tasks}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  )
}

export default SearchPage
