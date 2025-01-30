import { formatBytes } from '~/utils/functions'

export default function StatCard({
  icon,
  title,
  usage,
  total,
  unit,
}: {
  icon: React.ReactNode
  title: string
  usage: number
  total: number
  unit?: string
}) {
  const percentage = (usage * 100) / total
  return (
    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 flex items-center gap-4 h-24">
      <div className="py-2">{icon}</div>
      <div className="w-full h-full flex flex-col justify-center space-y-2 py-1.5">
        <h3 className="text-gray-400 text-lg flex w-full justify-between items-center">
          <span>{title}</span>
          <span className="text-base">
            {unit
              ? `${usage} ${unit} / ${total > 0 ? `${total} ${unit}` : '∞'}`
              : `${formatBytes(usage)} / ${total > 0 ? formatBytes(total) : '∞'}`}
          </span>
        </h3>
        {total > 0 && (
          <div className="flex items-center gap-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-full">
              <div
                className={`h-full rounded-full transition-all duration-500 ${percentage < 30 ? 'bg-green-500' : percentage < 60 ? 'bg-yellow-500' : percentage < 90 ? 'bg-orange-500' : 'bg-red-500'}`}
                style={{ width: `${total == 0 ? '0' : percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
