import Server from '#models/server'
import { HttpContext } from '@adonisjs/core/http'
import { convertObjToCamelCase } from '#utils/index'

export default class ServersController {
  async index({ inertia, params }: HttpContext) {
    const srv = await Server.query()
      .preload('node', (node) => node.select('fqdn', 'daemonListen'))
      .where('uuid', params.id)
      .orWhere('uuidShort', params.id)
      .select('cpu', 'memory', 'disk', 'uuid', 'uuidShort', 'nodeId')
      .first()

    const server = convertObjToCamelCase(srv?.serialize() as Record<string, unknown>)

    return inertia.render('server/index', { server })
  }

  async startup({ inertia }: HttpContext) {
    return inertia.render('server/startup/index')
  }

  async settings({ inertia }: HttpContext) {
    return inertia.render('server/settings/index')
  }
}
