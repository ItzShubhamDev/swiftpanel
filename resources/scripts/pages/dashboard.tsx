import { Head } from '@inertiajs/react'
import { ServerIcon, Cpu, MemoryStick, HardDrive, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ApiServer, Server, ApiServerStats } from '#types/client/server'
import { formatBytes, formatDuration } from '~/utils/functions'

export default function Dashboard() {
  const [servers, setServers] = useState<Server[]>([])

  useEffect(() => {
    fetch('/api/client')
      .then((res) => res.json())
      .then(async (data: { data: ApiServer[] }) => {
        const srvs = data.data.map(async (srv) => {
          const res = await fetch(`/api/client/servers/${srv.attributes.uuid}/resources`)
          const stats: ApiServerStats = await res.json()
          return {
            id: srv.attributes.identifier,
            name: srv.attributes.name,
            status: stats.attributes.current_state,
            memory: formatBytes(stats.attributes.resources.memory_bytes),
            cpu: stats.attributes.resources.cpu_absolute + '%',
            storage: formatBytes(stats.attributes.resources.disk_bytes),
            uptime: formatDuration(stats.attributes.resources.uptime),
          }
        })
        setServers(await Promise.all(srvs))
      })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Yours Servers</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server) => (
            <a
              key={server.id}
              href={`/server/${server.id}`}
              className={`rounded-lg shadow-sm hover:shadow-md border border-gray-200 transition-shadow p-6 ${
                server.status === 'running' ? 'bg-green-100' : 'bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{server.name}</h3>
                <ServerIcon className="h-6 w-6 text-gray-600" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MemoryStick className="h-5 w-5 mr-2" />
                  <span>Memory: {server.memory}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Cpu className="h-5 w-5 mr-2" />
                  <span>CPU: {server.cpu}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <HardDrive className="h-5 w-5 mr-2" />
                  <span>Storage: {server.storage}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Uptime: {server.uptime}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
