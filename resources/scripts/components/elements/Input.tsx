export default function Input({
  value,
  onChange,
  disabled = false,
  title,
  placeholder,
  type = 'text',
}: {
  value: string | number
  onChange: (value: string) => void
  disabled?: boolean
  title?: string
  placeholder?: string
  type?: string
}) {
  return (
    <div className="flex flex-col">
      {title && <h2 className="font-semibold text-emerald-400 mb-2">{title}</h2>}
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 dark:bg-gray-800 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      />
    </div>
  )
}
