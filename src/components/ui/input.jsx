const Input = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  className = '',
  required = false,
  ...rest
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D81E7] focus:border-transparent text-gray-800 ${className}`.trim()}
        {...rest}
      />
    </div>
  )
}

export default Input

