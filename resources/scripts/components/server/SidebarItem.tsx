import { Link, usePage } from '@inertiajs/react'

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
  const { route } = usePage().props as unknown as { route: string }
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2  hover:bg-gray-600 transition-colors ${routeName && route.includes(routeName) ? 'bg-gray-700 text-emerald-400' : 'text-gray-300'}`}
    >
      {icon}
      <span>{name}</span>
    </Link>
  )
}
