import Server from '#models/server'
import { handle, signToken } from '../index.js'

export async function contents(server: Server, file: string, download = false): Promise<string> {
  const response = await handle(
    server,
    `/api/servers/${server.uuid}/files/contents?file=${encodeURIComponent(file)}` +
      (download ? '&download=true' : ''),
    'GET',
    null,
    null
  )
  const data = (await response.text()) as string
  return data
}

export async function directory(server: Server, path: string): Promise<string[]> {
  const response = await handle(
    server,
    `/api/servers/${server.uuid}/files/list-directory?directory=${encodeURIComponent(path)}`,
    'GET'
  )
  const data = (await response.json()) as string[]

  return data
}

export async function rename(
  server: Server,
  root: string,
  files: {
    from: string
    to: string
  }[]
): Promise<void> {
  await handle(server, `/api/servers/${server.uuid}/files/rename`, 'PUT', {
    root,
    files,
  })
}

export async function copy(server: Server, location: string): Promise<void> {
  await handle(server, `/api/servers/${server.uuid}/files/copy`, 'POST', { location })
}

export async function upload(server: Server) {
  const token = signToken(
    server.node,
    '15m',
    { server_uuid: server.uuid },
    server.owner.id + server.uuid
  )

  return `${server.node.scheme}://${server.node.fqdn}:${server.node.daemonListen}/api/servers/${server.uuid}/upload/file?token=${token}`
}

export async function save(server: Server, file: string, content: string): Promise<void> {
  await handle(
    server,
    `/api/servers/${server.uuid}/files/write?file=${encodeURIComponent(file)}`,
    'POST',
    content
  )
}

export async function createDirectory(server: Server, name: string, path: string): Promise<void> {
  await handle(server, `/api/servers/${server.uuid}/files/create-directory`, 'POST', { name, path })
}

export async function deleteFiles(server: Server, files: string[], path: string): Promise<void> {
  await handle(server, `/api/servers/${server.uuid}/files/delete`, 'POST', { files, root: path })
}

export async function compress(server: Server, files: string[], path: string): Promise<string> {
  const response = await handle(server, `/api/servers/${server.uuid}/files/compress`, 'POST', {
    files,
    root: path,
  })
  const data = (await response.json()) as string

  return data
}
