import Server from '#models/server'
import { reinstall } from '#utils/wings/servers/server'
import { renameValidator, updateValidator } from '#validators/api/client/server'
import { HttpContext } from '@adonisjs/core/http'

export default class SettingsController {
  async rename({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(renameValidator)
    const server = await Server.query()
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()

    server.name = payload.name
    if (payload.description) server.description = payload.description

    await server.save()
    response.noContent()
  }

  async reinstallServer({ params, response }: HttpContext) {
    const server = await Server.query()
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()
    await reinstall(server)
    response.accepted([])
  }

  async updateImage({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(updateValidator)
    const server = await Server.query()
      .where('uuid', params.server_id)
      .orWhere('uuidShort', params.server_id)
      .firstOrFail()

    server.image = payload.docker_image
    await server.save()

    response.noContent()
  }
}
