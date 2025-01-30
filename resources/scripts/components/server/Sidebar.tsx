import {
  Terminal,
  Network,
  Users,
  Archive,
  Settings,
  Database,
  Play,
  Folder,
  Calendar,
  Eye,
} from 'lucide-react'
import Item from './SidebarItem'
import { Link, usePage } from '@inertiajs/react'

export function Sidebar() {
  const { params } = usePage().props as unknown as { params: { id: string } }

  return (
    <aside className="w-64 bg-gray-900 text-white">
      <div className="p-4">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <Terminal className="h-8 w-8 text-emerald-400" />
          <span>Swift Panel</span>
        </Link>
      </div>

      <nav className="mt-8">
        <Item
          href={`/server/${params.id}`}
          name="Console"
          icon={<Terminal className="h-5 w-5" />}
          routeName="server.index"
        />
        <Item
          href={`/server/${params.id}/files`}
          name="Files"
          icon={<Folder className="h-5 w-5" />}
          routeName="server.files"
        />
        <Item
          href={`/server/${params.id}/databases`}
          name="Databases"
          icon={<Database className="h-5 w-5" />}
        />
        <Item
          href={`/server/${params.id}/backups`}
          name="Backups"
          icon={<Archive className="h-5 w-5" />}
        />
        <Item
          href={`/server/${params.id}/network`}
          name="Network"
          icon={<Network className="h-5 w-5" />}
        />
        <Item
          href={`/server/${params.id}/schedules`}
          name="Schedules"
          icon={<Calendar className="h-5 w-5" />}
        />
        <Item
          href={`/server/${params.id}/users`}
          name="Users"
          icon={<Users className="h-5 w-5" />}
        />
        <Item
          href={`/server/${params.id}/startup`}
          name="Startup"
          icon={<Play className="h-5 w-5" />}
          routeName="server.startup"
        />
        <Item
          href={`/server/${params.id}/settings`}
          name="Settings"
          icon={<Settings className="h-5 w-5" />}
          routeName="server.settings"
        />
        <Item
          href={`/server/${params.id}/activity`}
          name="Activity"
          icon={<Eye className="h-5 w-5" />}
        />
      </nav>
    </aside>
  )
}
