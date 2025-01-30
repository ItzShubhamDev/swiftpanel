export default function TextArea({
  value,
  onChange,
  title,
  placeholder,
}: {
  value: string
  onChange?: (value: string) => void
  title: string
  placeholder: string
}) {
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-emerald-400 mb-2">{title}</h2>
      <textarea
        value={value}
        disabled={!onChange}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        className="resize-none w-full px-4 py-2 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      />
    </div>
  )
}
