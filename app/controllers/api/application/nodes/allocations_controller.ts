import { HttpContext } from '@adonisjs/core/http'
import Allocation from '#models/allocation'
import { pagination } from '#utils/index'
import { allocationTransformer } from '#transformers/api/application/allocation'
import { allocationValidator } from '#validators/api/application/node'

export default class AllocationController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)
    const allocations = await Allocation.query().paginate(page, limit)

    const response = {
      object: 'list',
      data: allocations.serialize().data.map((a) => {
        return allocationTransformer(a as Allocation)
      }),
      meta: {
        pagination: pagination(
          allocations.total,
          allocations.perPage,
          allocations.currentPage,
          allocations.lastPage,
          '/api/nodes/allocations'
        ),
      },
    }

    return response
  }

  async store({ params, request }: HttpContext) {
    const payload = await request.validateUsing(allocationValidator)
    const allocation = await Allocation.create({ ...payload, nodeId: params.node_id })

    return allocationTransformer(allocation)
  }

  async destroy({ params, response }: HttpContext) {
    const allocation = await Allocation.query()
      .where('node_id', params.node_id)
      .where('id', params.id)
      .firstOrFail()
    await allocation.delete()
    response.noContent()
  }
}
