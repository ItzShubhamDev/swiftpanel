import Nest from '#models/nest'
import type { HttpContext } from '@adonisjs/core/http'
import nestTransformer from '#transformers/api/application/nest'
import { pagination } from '#utils/index'

export default class NestsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)

    const nests = await Nest.query().paginate(page, limit)

    const response = {
      object: 'list',
      data: nests.serialize().data.map((n) => {
        return nestTransformer(n as Nest)
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
    const nest = await Nest.findOrFail(params.id)
    return nestTransformer(nest)
  }
}
