import { type HttpContext } from '@adonisjs/core/http'
import { pagination } from '#utils/index'
import Server from '#models/server'
import { getVariables } from '#utils/api/application/servers'
import serverTransformer from '#transformers/api/application/server'
import { serverValidator, variableValidator } from '#validators/api/application/server'
import { createServer } from '#utils/wings/servers/server'

export default class ServersController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)
    const servers = await Server.query()
      .preload('serverVariables', (variablesQuery) => {
        variablesQuery.preload('variable')
      })
      .paginate(page, limit)

    const response = {
      object: 'list',
      data: servers.serialize().data.map((s) => serverTransformer(s as Server)),
      meta: {
        pagination: pagination(
          servers.total,
          servers.perPage,
          servers.currentPage,
          servers.lastPage,
          '/api/servers'
        ),
      },
    }

    return response
  }

  async show({ params }: HttpContext) {
    const server = await Server.query()
      .where('id', params.id)
      .preload('serverVariables', (variablesQuery) => {
        variablesQuery.preload('variable')
      })
      .firstOrFail()

    return serverTransformer(server)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(serverValidator)
    const variables = await getVariables(payload.egg)
    const validator = variableValidator(variables as any[])
    const environmentVariables = {} as Record<string, string>
    variables.forEach((variable) => {
      environmentVariables[variable.envVariable] = payload.environment[variable.envVariable]
    })
    const environment = await validator.validate(environmentVariables)

    if (environment.errors) {
      return environment
    }

    const server = await Server.create({
      name: payload.name,
      ownerId: payload.user,
      eggId: payload.egg,
      image: payload.docker_image,
      startup: payload.startup,
      allocationId: payload.allocation.default,
    })

    await server.related('serverVariables').createMany(
      variables.map((variable) => {
        return {
          variableId: variable.id,
          variableValue: environment[variable.envVariable],
        }
      })
    )

    try {
      await createServer(server)
    } catch (error) {
      console.error(error)
    }

    return serverTransformer(server)
  }

  async update({ }: HttpContext) { }

  async destroy({ }: HttpContext) { }
}
