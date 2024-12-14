import ActivityLog from '#models/activity_log'
import User from '#models/user'
import activityLogTransformer from '#transformers/api/client/activity_log'
import userTransformer from '#transformers/api/client/user'
import { emailChangeValidator, passwordChangeValidator } from '#validators/api/client/account'
import { HttpContext } from '@adonisjs/core/http'

export default class AccountController {
  async index() {
    const user = await User.findOrFail(1)
    return userTransformer(user)
  }

  async updateEmail({ request, response }: HttpContext) {
    const payload = await request.validateUsing(emailChangeValidator)
    const u = await User.findOrFail(1)
    const user = await User.verifyCredentials(u.username, payload.password)

    user.email = payload.email
    await user.save()

    response.created([])
  }

  async updatePassword({ request, response }: HttpContext) {
    const payload = await request.validateUsing(passwordChangeValidator)
    const user = await User.findOrFail(1)

    await User.verifyCredentials(user.id.toString(), payload.current_password)

    user.password = payload.password
    await user.save()

    response.noContent()
  }

  async activity({ request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 50)
    const activities = await ActivityLog.query()
      .where('subjectType', 'user')
      .andWhere('subjectId', 1)
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)

    const response = {
      object: 'list',
      data: activities.serialize().data.map((activity) => {
        return activityLogTransformer(activity as ActivityLog)
      }),
    }

    return response
  }
}
