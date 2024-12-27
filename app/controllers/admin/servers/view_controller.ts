import Server from '#models/server'
import { notify } from '#utils/admin/admin'
import {
  updateBuildValidator,
  updateDetailsValidator,
  updateStartupValidator,
} from '#validators/admin/servers'
import { HttpContext } from '@adonisjs/core/http'
import serverNotices from '#langs/en/admin/server'
import Allocation from '#models/allocation'
import Nest from '#models/nest'
import EggVariable from '#models/egg_variable'
import { deleteServer } from '#utils/wings/servers/server'

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

  async startup({ params, view }: HttpContext) {
    const server = await Server.query()
      .where('id', params.id)
      .preload('serverVariables')
      .firstOrFail()
    const data = await Nest.query()
      .preload('eggs', (e) => e.preload('eggVariables'))
      .select('id', 'name')
      .exec()

    const nests = data.reduce(
      (acc, n) => {
        const nest = n.serialize()
        nest.eggs = n.eggs.reduce(
          (eggAcc, e) => {
            const egg = e.serialize()
            egg.variables = e.eggVariables
            eggAcc[egg.id] = egg
            return eggAcc
          },
          {} as Record<string, any>
        )

        acc[nest.id] = nest
        return acc
      },
      {} as Record<string, any>
    )

    const serverVariables = server.serverVariables.reduce(
      (acc, variable) => {
        acc[variable.variableId] = variable.variableValue
        return acc
      },
      {} as Record<number, any>
    )
    return view.render('admin/servers/pages/startup', {
      server: server.serialize(),
      nests,
      serverVariables,
    })
  }

  async updateStartup({ params, request, response, session }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { environment, custom_image, ...payload } =
      await request.validateUsing(updateStartupValidator)
    const server = await Server.findOrFail(params.id)
    server.merge({
      ...payload,
      image: custom_image ?? payload.image,
    })
    await server.save()

    const keys = Object.entries(environment).map((e) => e[0])

    const vars = await EggVariable.query()
      .whereIn('env_variable', keys)
      .where('egg_id', server.eggId)
      .select('id', 'env_variable')
      .exec()

    const variables = keys.map((key) => {
      return {
        variableValue: environment[key],
        variableId: vars.find((v) => v.envVariable === key)?.id,
      }
    })

    await server.related('serverVariables').updateOrCreateMany(variables, 'variableId')

    notify(session, serverNotices.alerts.startup_changed)
    return response.redirect().toRoute('admin.servers.startup', { id: params.id })
  }

  async database({ response }: HttpContext) {
    return response.notImplemented()
    // const server = await Server.query().where('id', params.id).firstOrFail()
    // return view.render('admin/servers/pages/database', { server: server.serialize() })
  }

  async manage({ response }: HttpContext) {
    return response.notImplemented()
    // const server = await Server.query().where('id', params.id).firstOrFail()
    // return view.render('admin/servers/pages/manage', { server: server.serialize() })
  }

  async delete({ request, params, view, response }: HttpContext) {
    const method = request.method()
    if (method === 'GET') {
      const server = await Server.query().where('id', params.id).firstOrFail()

      return view.render('admin/servers/pages/delete', { server: server.serialize() })
    } else if (method === 'DELETE') {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { force_delete } = request.all()
      const server = await Server.findOrFail(params.id)
      if (force_delete) {
        await server.delete()
      } else {
        try {
          await deleteServer(server)
        } catch (error) {
          console.error(error)
          return response.badRequest()
        }
        await server.delete()
      }

      return response.redirect().toRoute('admin.servers.index')
    }
  }
}
