import { router, usePage } from '@inertiajs/react'
import { UserRound, Search, LogOut, UserRoundCog } from 'lucide-react'
import type { User } from '#types/client/user'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const props = usePage().props
  const user = props.user as User

  const logout = () => {
    router.post('/auth/logout')
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative md:w-96">
            <input
              type="text"
              placeholder="Search servers..."
              className="w-full dark:bg-gray-800 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-100">
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-end mr-2">
              <span className="text-lg">{user.name_first}</span>
              <span className="text-xs">{user.name_last}</span>
            </div>
            <a href="/admin">
              <UserRoundCog className="h-5 w-5 hover:text-emerald-400 transition-colors" />
            </a>
            <ThemeToggle />
            {/* <button>
              <UserRound className="h-5 w-5 text-gray-400 hover:text-emerald-400 transition-colors" />
            </button> */}
            <button onClick={logout}>
              <LogOut className="h-5 w-5 hover:text-emerald-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
