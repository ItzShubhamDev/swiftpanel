import exceptions from '#langs/en/exceptions'
import Location from '#models/location'
import { notify, notifyError } from '#utils/admin/admin'
import { locationValidator } from '#validators/admin/locations'
import { HttpContext } from '@adonisjs/core/http'

export default class LocationsController {
  async index({ view }: HttpContext) {
    const data = await Location.query()
      .preload('nodes', (n) => n.preload('servers'))
      .exec()
    const locations = data.map((location) => {
      const loc = location.serialize()
      return {
        ...loc,
        nodes_count: location.nodes.length,
        servers_count: location.nodes.reduce((acc, node) => acc + node.servers.length, 0),
      }
    })
    return view.render('admin/locations/index', { locations })
  }

  async show({ view, params }: HttpContext) {
    const id = params.id
    const location = await Location.query()
      .preload('nodes', (n) => n.preload('servers'))
      .where('id', id)
      .firstOrFail()
    return view.render('admin/locations/view', { location })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(locationValidator)
    const { id } = await Location.create(payload)

    notify(session, 'Location has been created successfully.')
    return response.redirect().toRoute('admin.locations.show', { id })
  }

  async update({ request, response, session, params }: HttpContext) {
    const payload = await request.validateUsing(locationValidator)
    const location = await Location.findOrFail(params.id)
    location.merge(payload)
    await location.save()

    notify(session, 'Location has been updated successfully.')
    return response.redirect().toRoute('admin.locations.show', { id: location.id })
  }

  async destroy({ response, session, params }: HttpContext) {
    const location = await Location.query().withCount('nodes').where('id', params.id).firstOrFail()
    if (location.$extras.nodes_count > 0) {
      notifyError(session, exceptions.locations.has_nodes)
      return response.redirect().back()
    }
    await location.delete()

    notify(session, 'Location has been deleted successfully.')
    return response.redirect().toRoute('admin.locations.index')
  }
}
