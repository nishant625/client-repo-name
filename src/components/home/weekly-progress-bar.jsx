const WeeklyProgressBar = ({ summary }) => {
  const completed = summary?.completed || 0
  const total = summary?.total || 0

  return (
    <div className="my-4">
      <div className="font-semibold mb-2">Weekly Progress</div>
      <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full bg-[#4D81E7] rounded-full"
          style={{ width: `${total > 0 ? (completed / total * 100) : 0}%` }}
        />
      </div>
    </div>
  )
}

export default WeeklyProgressBar
