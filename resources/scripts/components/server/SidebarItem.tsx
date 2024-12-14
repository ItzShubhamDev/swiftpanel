import { route } from '@izzyjs/route/client'

export default function Item({
  href,
  name,
  icon,
  routeName,
}: {
  href: string
  name: string
  icon: React.ReactNode
  routeName?: string
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors ${routeName && route().current(routeName as any) ? 'bg-gray-800 text-emerald-400' : ''}`}
    >
      {icon}
      <span>{name}</span>
    </a>
  )
}
