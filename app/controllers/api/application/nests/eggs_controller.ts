import Egg from '#models/egg'
import type { HttpContext } from '@adonisjs/core/http'
import eggTransformer from '#transformers/api/application/egg'
import { pagination } from '#utils/index'

export default class EggsController {
  async index({ params, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)

    const nests = await Egg.query().where('nestId', params.nest_id).paginate(page, limit)

    const response = {
      object: 'list',
      data: nests.serialize().data.map((e) => {
        return eggTransformer(e as Egg)
      }),
      meta: {
        pagination: pagination(
          nests.total,
          nests.perPage,
          nests.currentPage,
          nests.lastPage,
          '/api/nests'
        ),
      },
    }

    return response
  }

  async show({ params }: HttpContext) {
    const nest = await Egg.query()
      .where('id', params.id)
      .andWhere('nestId', params.nest_id)
      .firstOrFail()
    return eggTransformer(nest)
  }
}
