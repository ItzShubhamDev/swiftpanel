import Server from '#models/server'
import { Server as WingsServer } from '#types/wings/server'
import { handle } from '#utils/wings/index'

export async function serverResources(server: Server): Promise<WingsServer> {
  const response = await handle(server, `/api/servers/${server.uuid}`)
  const data = (await response.json()) as WingsServer

  return data
}

export async function deleteServer(server: Server): Promise<void> {
  await handle(server, `/api/servers/${server.uuid}`, 'DELETE')
}

export async function serverLogs(server: Server): Promise<string[]> {
  const response = await handle(server, `/api/servers/${server.uuid}/logs`)
  const data = (await response.json()) as { data: string[] }

  return data.data
}

export async function power(
  server: Server,
  action: 'start' | 'stop' | 'restart' | 'kill'
): Promise<void> {
  await handle(server, `/api/servers/${server.uuid}/power`, 'POST', { action })
}

export async function commands(server: Server, commandsArr: string[]): Promise<void> {
  await handle(server, `/api/servers/${server.uuid}/command`, 'POST', { commands: commandsArr })
}

export async function install(server: Server): Promise<void> {
  await handle(server, `/api/servers/${server.uuid}/install`, 'POST')
}

export async function reinstall(server: Server): Promise<void> {
  await handle(server, `/api/servers/${server.uuid}/reinstall`, 'POST')
}

export async function sync(server: Server): Promise<void> {
  await handle(server, `/api/servers/${server.uuid}/sync`, 'POST')
}

export async function revokeJTI(server: Server, jtis: string[]): Promise<void> {
  await handle(server, `/api/servers/${server.uuid}/ws/deny`, 'POST', { jtis })
}
