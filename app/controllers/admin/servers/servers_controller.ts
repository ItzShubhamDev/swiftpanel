import Allocation from '#models/allocation'
import Location from '#models/location'
import Nest from '#models/nest'
import Server from '#models/server'
import { notify } from '#utils/admin/admin'
import { createServerValidator } from '#validators/admin/servers'
import { HttpContext } from '@adonisjs/core/http'
import serverNotices from '#langs/en/admin/server'
import EggVariable from '#models/egg_variable'
import { createServer } from '#utils/wings/servers/server'

export default class ServersController {
  async index({ view }: HttpContext) {
    const data = await Server.query()
      .preload('node', (n) => n.select('name'))
      .preload('owner', (o) => o.select('username'))
      .paginate(1, 50)

    // Preload allocations was not working so I had to do it manually
    const srvs = data.map(async (server) => {
      const srv = server.serialize()
      const allocation = await Allocation.query()
        .where('serverId', server.id)
        .select('ip', 'ip_alias', 'port')
        .first()
      srv.allocation = allocation?.serialize()
      return srv
    })

    const servers = data.serialize()
    servers.data = await Promise.all(srvs)

    return view.render('admin/servers/index', { servers })
  }

  async show({ view, params }: HttpContext) {
    const server = await Server.query()
      .where('id', params.id)
      .preload('node', (n) => n.select('name'))
      .preload('owner', (o) => o.select('username'))
      .preload('nest', (n) => n.select('name'))
      .preload('egg', (e) => e.select('name'))
      .firstOrFail()

    const allocation = await Allocation.query()
      .where('serverId', server.id)
      .select('ip', 'ip_alias', 'port')
      .firstOrFail()

    const srv = server.serialize()
    srv.allocation = allocation.serialize()

    return view.render('admin/servers/show', { server: srv })
  }

  async store({ request, session, response }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { environment, custom_image, allocation_additional, ...payload } =
      await request.validateUsing(createServerValidator)

    const server = await Server.create({
      ...payload,
      image: custom_image ?? payload.image,
    })

    await Allocation.query().where('id', payload.allocation_id).update({ serverId: server.id })

    if (allocation_additional) {
      await Allocation.query().whereIn('id', allocation_additional).update({ serverId: server.id })
    }

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

    await server.related('serverVariables').createMany(variables)

    notify(session, serverNotices.alerts.server_created)

    try {
      await createServer(server, payload.start_on_completion!)
    } catch (error) {
      console.error(error)
    }

    return response.redirect().toRoute('admin.servers.show', { id: server.id })
  }

  async create({ view }: HttpContext) {
    const locations = await Location.query()
      .preload('nodes', (n) =>
        n
          .preload('allocations', (a) => a.select('id', 'ip', 'port', 'serverId'))
          .select('id', 'name')
      )
      .select('id', 'short', 'long')
      .exec()

    const nodeData = [] as any[]
    locations.forEach((location) => {
      location.nodes.forEach((node) => {
        nodeData.push({
          id: node.id,
          text: node.name,
          allocations: node.allocations
            .filter((a) => !a.serverId)
            .map((a) => ({ id: a.id, text: `${a.ip}:${a.port}` })),
        })
      })
    })

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

    return view.render('admin/servers/create', { locations, nodeData, nests })
  }
}
