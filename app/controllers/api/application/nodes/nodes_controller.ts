import Node from '#models/node'
import type { HttpContext } from '@adonisjs/core/http'
import nodeTransformer from '#transformers/api/application/node'
import { pagination } from '#utils/index'
import { nodeValidator } from '#validators/api/application/node'

export default class NodesController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)
    const nodes = await Node.query().paginate(page, limit)

    const response = {
      object: 'list',
      data: nodes.serialize().data.map((n) => {
        return nodeTransformer(n as Node)
      }),
      meta: {
        pagination: pagination(
          nodes.total,
          nodes.perPage,
          nodes.currentPage,
          nodes.lastPage,
          '/api/nodes'
        ),
      },
    }

    return response
  }

  async show({ params }: HttpContext) {
    const node = await Node.findOrFail(params.id)
    return nodeTransformer(node)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(nodeValidator)

    const node = await Node.create({
      behindProxy: payload.behind_proxy || false,
      daemonBase: payload.daemon_base || '/var/lib/pterodactyl/volumes',
      daemonListen: payload.daemon_listen,
      daemonSftp: payload.daemon_sftp,
      description: payload.description || null,
      disk: payload.disk,
      diskOverallocate: payload.disk_overallocate,
      fqdn: payload.fqdn,
      locationId: payload.location_id,
      maintenanceMode: payload.maintenance_mode || false,
      memory: payload.memory,
      memoryOverallocate: payload.memory_overallocate,
      name: payload.name,
      public: payload.public || true,
      scheme: payload.scheme,
      uploadSize: payload.upload_size || 100,
    })

    return nodeTransformer(node)
  }

  async update({ request, params }: HttpContext) {
    const node = await Node.findOrFail(params.id)
    const payload = await request.validateUsing(nodeValidator)

    node.merge({
      daemonListen: payload.daemon_listen,
      daemonSftp: payload.daemon_sftp,
      disk: payload.disk,
      diskOverallocate: payload.disk_overallocate,
      fqdn: payload.fqdn,
      locationId: payload.location_id,
      memory: payload.memory,
      memoryOverallocate: payload.memory_overallocate,
      name: payload.name,
      scheme: payload.scheme,
    })
    if (payload.behind_proxy) node.behindProxy = payload.behind_proxy
    if (payload.daemon_base) node.daemonBase = payload.daemon_base
    if (payload.description) node.description = payload.description
    if (payload.maintenance_mode) node.maintenanceMode = payload.maintenance_mode
    if (payload.public) node.public = payload.public
    if (payload.upload_size) node.uploadSize = payload.upload_size

    await node.save()
    return nodeTransformer(node)
  }

  async destroy({ params, response }: HttpContext) {
    const node = await Node.findOrFail(params.id)
    await node.delete()

    return response.noContent()
  }
}
