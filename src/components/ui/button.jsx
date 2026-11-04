const VARIANT_STYLES = {
  primary: 'bg-[#4D81E7] text-white hover:bg-[#3D6BC7]',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  danger: 'bg-red-500 text-white hover:bg-red-600'
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const variantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.primary
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl px-6 py-3 font-medium transition ${variantClass} ${disabledClass} ${className}`.trim()}
    >
      {children}
    </button>
  )
}

export default Button

