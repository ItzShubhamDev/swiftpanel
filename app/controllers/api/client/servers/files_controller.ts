import Server from '#models/server'
import { signToken } from '#utils/wings/index'
import {
  directory,
  contents,
  createDirectory,
  deleteFiles,
  rename,
  save,
} from '#utils/wings/servers/files'
import { HttpContext } from '@adonisjs/core/http'

export default class FilesController {
  async index({ params, response }: HttpContext) {
    const path = params['*'] ? params['*'].join('/') : ''
    const server = await Server.query()
      .preload('node')
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()
    const files = await directory(server, path)
    return response.json(files)
  }

  async show({ params, response }: HttpContext) {
    const path = params['*'] ? params['*'].join('/') : ''
    const server = await Server.query()
      .preload('node')
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()
    const files = await contents(server, path)
    return response.json(files)
  }

  async store({ params, response, request }: HttpContext) {
    const path = params['*'] ? params['*'].join('/') : ''
    const name = request.input('name')
    if (!name) return response.status(400).json({ error: 'Name is required' })
    const server = await Server.query()
      .preload('node')
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()
    await createDirectory(server, name, path)
    return response.noContent()
  }

  async destroy({ params, response, request }: HttpContext) {
    const { files, path } = request.only(['files', 'path'])
    if (!files) return response.status(400).json({ error: 'Files and path are required' })
    const server = await Server.query()
      .preload('node')
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()
    await deleteFiles(server, files, path || '')
    return response.noContent()
  }

  async rename({ params, response, request }: HttpContext) {
    const { name, newName, path } = request.only(['name', 'newName', 'path'])
    if (!name || !newName)
      return response.status(400).json({ error: 'Name and New name as required' })
    const server = await Server.query()
      .preload('node')
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()
    await rename(server, path || '', [
      {
        from: name,
        to: newName,
      },
    ])
    return response.noContent()
  }

  async content({ params, response, request }: HttpContext) {
    const { path } = request.qs()
    if (!path) return response.status(400).json({ error: 'Path is required' })
    const server = await Server.query()
      .preload('node')
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()
    const content = await contents(server, path)
    return response.json({ content })
  }

  async update({ params, response, request }: HttpContext) {
    const { path } = request.qs()
    const { content } = request.only(['content']) || ''
    if (!path) return response.status(400).json({ error: 'Path and Content are required' })
    const server = await Server.query()
      .preload('node')
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()
    await save(server, path, content)
    return response.noContent()
  }

  async download({ params, response, request }: HttpContext) {
    const { path } = request.qs()
    if (!path) return response.status(400).json({ error: 'Path is required' })
    const server = await Server.query()
      .preload('node')
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()
    const token = await signToken(
      server.node,
      '15m',
      { server_uuid: server.uuid, file_path: path, user_id: server.ownerId },
      server.ownerId + server.uuid
    )
    return response.json({
      url: `${server.node.scheme}://${server.node.fqdn}:${server.node.daemonListen}/download/file?token=${token}`,
    })
  }
}
