import { HttpContext } from '@adonisjs/core/http'
import { activityValidator } from '#validators/api/remote/server'
import Server from '#models/server'
import User from '#models/user'
import ActivityLog from '#models/activity_log'

export default class ActivityController {
  async activity({ request, node, response }: HttpContext) {
    const payload = await request.validateUsing(activityValidator)
    const servers = await Server.query()
      .whereIn(
        'uuid',
        payload.data.map((activity) => activity.server)
      )
      .andWhere('nodeId', node!.id)
    const users = await User.query().whereIn(
      'uuid',
      payload.data.map((activity) => activity.user)
    )
    await ActivityLog.createMany(
      payload.data.map((activity) => {
        return {
          event: activity.action,
          ip: activity.ip,
          actorId: users.find((u) => u.uuid === activity.user)!.id,
          actorType: 'user',
          subjectId: servers.find((s) => s.uuid === activity.server)!.id,
          subjectType: 'server',
          properties: JSON.stringify(activity.metadate),
        }
      })
    )

    return response.noContent()
  }
}
