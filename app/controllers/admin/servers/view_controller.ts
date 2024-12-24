import Server from '#models/server'
import { notify } from '#utils/admin/admin'
import { updateBuildValidator, updateDetailsValidator } from '#validators/admin/servers'
import { HttpContext } from '@adonisjs/core/http'
import serverNotices from '#langs/en/admin/server'
import Allocation from '#models/allocation'

export default class ServersViewController {
  async details({ params, view }: HttpContext) {
    const server = await Server.query()
      .preload('owner', (o) => o.select('email', 'name_first', 'name_last'))
      .where('id', params.id)
      .firstOrFail()

    return view.render('admin/servers/pages/details', { server: server.serialize() })
  }

  async updateDetails({ params, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(updateDetailsValidator)

    const server = await Server.findOrFail(params.id)
    server.merge(payload)
    await server.save()

    notify(session, serverNotices.alerts.details_updated)
    return response.redirect().toRoute('admin.servers.details', { id: server.id })
  }

  async build({ params, view }: HttpContext) {
    const server = await Server.query().where('id', params.id).firstOrFail()
    const allocations = await Allocation.query()
    const assigned = allocations
      .filter((allocation) => allocation.serverId)
      .map((allocation) => allocation.serialize())
    const unassigned = allocations
      .filter((allocation) => !allocation.serverId)
      .map((allocation) => allocation.serialize())

    return view.render('admin/servers/pages/build', {
      server: server.serialize(),
      assigned,
      unassigned,
    })
  }

  async updateBuild({ params, request, response, session }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { add_allocations, remove_allocations, ...payload } =
      await request.validateUsing(updateBuildValidator)

    const server = await Server.findOrFail(params.id)
    server.merge(payload)

    if (add_allocations) {
      await Allocation.query().whereIn('id', add_allocations).update({ serverId: server.id })
    }

    if (remove_allocations) {
      await Allocation.query().whereIn('id', remove_allocations).update({ serverId: null })
    }

    notify(session, serverNotices.alerts.build_updated)
    return response.redirect().toRoute('admin.servers.build', { id: server.id })
  }

  async startup({ view }: HttpContext) {}
  async database({ view }: HttpContext) {}
  async mounts({ view }: HttpContext) {}
  async manage({ view }: HttpContext) {}
  async delete({ view }: HttpContext) {}
}
