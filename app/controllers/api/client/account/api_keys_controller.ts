import User from '#models/user'
import apiKeyTransformer from '#transformers/api/client/api_key'
import { apiKeyValidator } from '#validators/api/client/api_key'
import { HttpContext } from '@adonisjs/core/http'

export default class ApiKeysController {
  async index() {
    const user = await User.findOrFail(1)
    const apiKeys = await User.apiKeys.all(user)

    const response = {
      object: 'list',
      data: apiKeys.map((apiKey) => apiKeyTransformer(apiKey)),
    }

    return response
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(apiKeyValidator)
    const user = await User.findOrFail(1)

    const apiKey = await User.apiKeys.create(user, ['*'], { name: payload.description })

    const response = {
      ...apiKeyTransformer(apiKey),
      meta: {
        secret_token: apiKey.value?.release(),
      },
    }

    return response
  }

  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(1)
    await User.apiKeys.find(user, params.id)

    await User.apiKeys.delete(user, params.id)

    response.noContent()
  }
}
