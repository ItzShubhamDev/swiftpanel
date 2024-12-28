import { router, usePage } from '@inertiajs/react'
import { UserRound, Search, LogOut, UserRoundCog } from 'lucide-react'
import type { User } from '#types/client/user'

export function Navbar() {
  const props = usePage().props
  const user = props.user as User

  const logout = () => {
    router.post('/auth/logout')
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search servers..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <span className="text-sm font-medium text-gray-700 mr-2">
              {user.name_first} {user.name_last}
            </span>
            <a href="/admin">
              <UserRoundCog className="h-5 w-5 text-gray-400 hover:text-emerald-400 transition-colors" />
            </a>
            <button>
              <UserRound className="h-5 w-5 text-gray-400 hover:text-emerald-400 transition-colors" />
            </button>
            <button onClick={logout}>
              <LogOut className="-5 w-5 text-gray-400 hover:text-emerald-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
