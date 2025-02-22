import { startup } from '#utils/api/client/servers'
import ServerVariable from '#models/server_variable'
import { variableValidator } from '#validators/api/client/server'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import eggVariableTransformer from '#transformers/api/client/egg_variable'
import Server from '#models/server'

export default class StartupController {
  async index({ params }: HttpContext) {
    const variables = await ServerVariable.query()
      .preload('server', (server) =>
        server.where('uuid', params.server_id).orWhere('uuidShort', params.server_id)
      )
      .preload('variable')

    const srv = await Server.query()
      .preload('egg', (egg) => egg.select('dockerImages'))
      .select('image', 'eggId')
      .first()

    const variableValues = {} as Record<string, string>

    const serverVariables = variables
      .filter((v) => v.variable.userViewable)
      .map((variable) => {
        variableValues[variable.variable.envVariable] = variable.variableValue
        return eggVariableTransformer(variable)
      })

    const images = JSON.parse(srv?.egg.dockerImages || '{}') as Record<string, string>

    const response = {
      object: 'list',
      data: serverVariables,
      meta: {
        docker_images: images,
        docker_image: srv?.image,
        raw_startup_command: variables[0].server.startup,
        startup_command: startup(variables[0].server.startup, variableValues),
      },
    }

    return response
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(
      vine.compile(vine.object({ key: vine.string(), value: vine.string() }))
    )

    const variables = await ServerVariable.query()
      .preload('server', (server) =>
        server.where('uuid', params.server_id).orWhere('uuidShort', params.server_id)
      )
      .preload('variable', (variable) => variable.where('user_editable', true))
    const variable = variables.find((v) => v.variable.envVariable === payload.key)

    if (!variable) {
      return { error: 'Variable not found' }
    }
    const validator = variableValidator([variable.variable])
    const variablePayload = await validator.validate({
      [variable.variable.envVariable]: payload.value,
    })

    variable.variableValue = variablePayload[variable.variable.envVariable]
    await variable.save()

    return eggVariableTransformer(variable)
  }
}
