export default function Button({
  onClick,
  children,
  type = 'button',
}: {
  onClick: () => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="px-4 py-2 bg-emerald-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
    >
      {children}
    </button>
  )
}
