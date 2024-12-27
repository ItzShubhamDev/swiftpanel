import serverTransformer from '#transformers/api/client/server'
import ActivityLog from '#models/activity_log'
import Server from '#models/server'
import { HttpContext } from '@adonisjs/core/http'
import activityLogTransformer from '#transformers/api/client/activity_log'
import { signToken } from '#utils/wings/index'
import { commands, power, serverResources } from '#utils/wings/servers/server'
import vine from '@vinejs/vine'

export default class ServersController {
  async index({ params }: HttpContext) {
    const server = await Server.query()
      .preload('node', (node) => node.select('fqdn', 'daemonSftp'))
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()

    return serverTransformer(server)
  }

  async websocket({ params, response }: HttpContext) {
    const server = await Server.query()
      .preload('node')
      .preload('owner', (o) => o.select('id', 'uuid', 'rootAdmin'))
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()

    const permissions = ['*']
    server.owner.rootAdmin &&
      ['admin.websocket.errors', 'admin.websocket.install', 'admin.websocket.transfer'].forEach(
        (permission) => permissions.push(permission)
      )

    const token = await signToken(
      server.node,
      '10m',
      {
        server_uuid: server.uuid,
        permissions,
        user_uuid: server.owner.uuid,
      },
      server.uuid + server.owner.id
    )

    return response.json({ token })
  }

  async resources({ params }: HttpContext) {
    const server = await Server.query()
      .preload('node')
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()

    const data = await serverResources(server)
    return {
      object: 'stats',
      attributes: {
        current_state: data.state,
        is_suspended: data.is_suspended,
        resources: {
          ...data.utilization,
        },
      },
    }
  }

  async activity({ params }: HttpContext) {
    const server = await Server.query()
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()
    const activities = await ActivityLog.query()
      .where('subjectType', 'server')
      .andWhere('subjectId', server.id)
      .orderBy('createdAt', 'desc')

    return {
      data: activities.map((activity) => {
        return activityLogTransformer(activity)
      }),
    }
  }

  async command({ params, response, request }: HttpContext) {
    const { command } = await request.validateUsing(
      vine.compile(
        vine.object({
          command: vine.string(),
        })
      )
    )
    const server = await Server.query()
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()
    await commands(server, [command])
    return response.noContent()
  }

  async power({ params, response, request }: HttpContext) {
    const { signal } = (await request.validateUsing(
      vine.compile(
        vine.object({
          signal: vine.string().in(['start', 'stop', 'restart', 'kill']),
        })
      )
    )) as { signal: 'start' | 'stop' | 'restart' | 'kill' }
    const server = await Server.query()
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()
    await power(server, signal)
    return response.noContent()
  }
}
