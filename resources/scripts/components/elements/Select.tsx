export default function Select({
  value,
  onChange,
  title,
  children,
}: {
  value: string
  onChange: (value: string) => void
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      {title && <h2 className="font-semibold text-emerald-400 mb-2">{title}</h2>}
      <select
        className="w-full px-4 py-2 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </div>
  )
}
