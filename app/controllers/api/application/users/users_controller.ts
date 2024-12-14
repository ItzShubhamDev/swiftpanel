import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { pagination } from '#utils/index'
import { createUserValidator, updateUserValidator } from '#validators/api/application/user'
import userTransformer from '#transformers/api/application/user'

export default class UsersController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)
    const users = await User.query().paginate(page, limit)

    const response = {
      object: 'list',
      data: users.serialize().data.map((u) => {
        return userTransformer(u as User)
      }),
      meta: {
        pagination: pagination(
          users.total,
          users.perPage,
          users.currentPage,
          users.lastPage,
          '/api/users'
        ),
      },
    }

    return response
  }

  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return userTransformer(user)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = await User.create({
      email: payload.email,
      externalId: payload.external_id || null,
      gravatar: 1,
      language: payload.language || 'en',
      nameFirst: payload.first_name,
      nameLast: payload.last_name,
      password: payload.password || '',
      rootAdmin: payload.root_admin || false,
      useTotp: false,
      username: payload.username,
    })

    return userTransformer(user)
  }

  async update({ request, params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(updateUserValidator)

    user.merge({
      email: payload.email,
      gravatar: 1,
      nameFirst: payload.first_name,
      nameLast: payload.last_name,
      useTotp: false,
      username: payload.username,
    })
    if (payload.password) user.password = payload.password
    if (payload.external_id) user.externalId = payload.external_id
    if (payload.language) user.language = payload.language
    if (payload.root_admin) user.rootAdmin = payload.root_admin

    await user.save()
    return userTransformer(user)
  }

  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.noContent()
  }
}
