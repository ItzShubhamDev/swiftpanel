import type { HttpContext } from '@adonisjs/core/http'
import Database from '#models/database'
import databaseTransformer from '#transformers/api/application/database'
import { databaseValidator } from '#validators/server'

export default class DatabasesController {
  async index({ params }: HttpContext) {
    const databases = await Database.query().where('server_id', params.server_id).paginate(1)
    const res = {
      object: 'list',
      data: databases.map((database) => databaseTransformer(database)),
    }
    return res
  }

  async show({ params }: HttpContext) {
    const database = await Database.query()
      .where('server_id', params.server_id)
      .andWhere('id', params.id)
      .firstOrFail()
    return databaseTransformer(database)
  }

  async store({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(databaseValidator)

    response.created({ message: 'Not implemented' })
  }

  async destroy({ params, response }: HttpContext) {
    const database = await Database.query()
      .where('server_id', params.server_id)
      .andWhere('id', params.id)
      .firstOrFail()

    await database.delete()
    return response.noContent()
  }
}
