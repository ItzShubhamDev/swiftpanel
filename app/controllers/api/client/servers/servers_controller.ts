import serverTransformer from '#transformers/api/client/server'
import ActivityLog from '#models/activity_log'
import Server from '#models/server'
import { HttpContext } from '@adonisjs/core/http'
import activityLogTransformer from '#transformers/api/client/activity_log'
import { signToken } from '#utils/wings/index'

export default class ServersController {
  async index({ params }: HttpContext) {
    const server = await Server.query()
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()

    return serverTransformer(server)
  }

  async websocket({ params }: HttpContext) {
    const server = await Server.query()
      .preload('node')
      .preload('owner')
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()

    const token = await signToken(
      server.node,
      '10m',
      {
        server_uuid: server.uuid,
        permissions: [
          '*',
          'admin.websocket.errors',
          'admin.websocket.install',
          'admin.websocket.transfer',
        ],
        user_uuid: server.owner.uuid,
      },
      server.uuid + server.owner.id
    )
  }

  async resources({ params }: HttpContext) {
    return {
      object: 'stats',
      attributes: {
        current_state: 'starting',
        is_suspended: false,
        resources: {
          memory_bytes: 588701696,
          cpu_absolute: 0,
          disk_bytes: 130156361,
          network_rx_bytes: 694220,
          network_tx_bytes: 337090,
          uptime: 0,
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

  async command({ params, response }: HttpContext) {
    response.noContent()
  }

  async power({ params, response }: HttpContext) {
    response.noContent()
  }
}
