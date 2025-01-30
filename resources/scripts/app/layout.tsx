import { Navbar } from '~/components/Navbar'
import { Sidebar } from '~/components/server/Sidebar'
import { usePage } from '@inertiajs/react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { route } = usePage().props as unknown as { route: string }
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-800">
      {route.startsWith('server') && <Sidebar />}
      <div className="h-full flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="h-full flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
