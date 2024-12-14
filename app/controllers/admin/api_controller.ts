import ApiKey from '#models/api_key'
import ApiKeyValue from '#models/api_key_value'
import User from '#models/user'
import { newValidator } from '#validators/auth/api/new'
import { HttpContext } from '@adonisjs/core/http'

export default class ApiController {
  async index({ view }: HttpContext) {
    const apiKeys = await ApiKeyValue.query().preload('apiKey').exec()
    const keys = apiKeys.map((key) => {
      return {
        identifier: key.apiKeyId,
        token: key.key,
        memo: key.apiKey.name,
        lastUsedAt: key.apiKey.lastUsedAt,
        createdAt: key.apiKey.createdAt,
      }
    })
    return view.render('admin/api/index', { keys })
  }

  async new({ view }: HttpContext) {
    return view.render('admin/api/new', {
      resources: [
        'allocations',
        'database_hosts',
        'eggs',
        'locations',
        'nests',
        'nodes',
        'server_databases',
        'servers',
        'users',
      ],
    })
  }

  async create({ request, session, auth, response }: HttpContext) {
    const { description, ...resources } = await request.validateUsing(newValidator)
    const user = auth.user as User
    const token = await User.apiKeys.create(user, Object.values(resources), {
      name: description,
    })
    ApiKeyValue.create({ key: token.value?.release(), apiKeyId: token.identifier as number })
    session.flash('alert', {
      type: 'success',
      message: 'A new application API key has been generated for your account.',
    })
    response.redirect().toRoute('admin.api.index')
  }

  async delete({ params }: HttpContext) {
    const id = params.id
    await ApiKey.query().where('id', id).delete()
  }
}
