import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import userTransformer from '#transformers/api/application/user'

export default class ExternalUsersController {
  async show({ params }: HttpContext) {
    const user = await User.query().where('externalId', params.id).firstOrFail()
    return userTransformer(user)
  }
}
