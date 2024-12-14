import Location from '#models/location'
import { locationValidator } from '#validators/api/application/location'
import type { HttpContext } from '@adonisjs/core/http'
import locationTransformer from '#transformers/api/application/location'
import { pagination } from '#utils/index'

export default class LocationsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)
    const locations = await Location.query().paginate(page, limit)

    const response = {
      object: 'list',
      data: locations.serialize().data.map((l) => {
        return locationTransformer(l as Location)
      }),
      meta: {
        pagination: pagination(
          locations.total,
          locations.perPage,
          locations.currentPage,
          locations.lastPage,
          '/api/locations'
        ),
      },
    }

    return response
  }

  async show({ params }: HttpContext) {
    const location = await Location.findOrFail(params.id)
    return locationTransformer(location)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(locationValidator)
    const location = await Location.create({
      long: payload.long || null,
      short: payload.short,
    })
    return locationTransformer(location)
  }

  async update({ request, params }: HttpContext) {
    const location = await Location.findOrFail(params.id)
    const payload = await request.validateUsing(locationValidator)
    location.merge({
      long: payload.long || null,
      short: payload.short,
    })
    await location.save()
    return locationTransformer(location)
  }

  async destroy({ params, response }: HttpContext) {
    const location = await Location.findOrFail(params.id)
    await location.delete()
    response.noContent()
  }
}
