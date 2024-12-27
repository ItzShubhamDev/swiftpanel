import serverTransformer from '#transformers/api/application/server'
import Server from '#models/server'
import {
  buildValidator,
  detailsValidator,
  startupValidator,
} from '#validators/api/application/server'
import { HttpContext } from '@adonisjs/core/http'

export default class ServerOperationsController {
  async handle({ request, params, response }: HttpContext) {
    const method = request.method()
    const url = request.url()
    const id = params.id
    const operation = params.operation as string

    const server = await Server.findOrFail(id)

    switch (`${method.toUpperCase()} ${operation.toLowerCase()}`) {
      case 'PATCH details':
        const detailsPayload = await request.validateUsing(detailsValidator)
        server.merge({
          name: detailsPayload.name,
          ownerId: detailsPayload.user,
          description: detailsPayload.description || server.description,
          externalId: detailsPayload.external_id || server.externalId,
        })
        await server.save()
        return serverTransformer(server)

      case 'PATCH build':
        const buildPayload = await request.validateUsing(buildValidator)
        server.merge({
          memory: buildPayload.memory || buildPayload.limits?.memory,
          swap: buildPayload.swap || buildPayload.limits?.swap,
          disk: buildPayload.disk || buildPayload.limits?.disk,
          io: buildPayload.io || buildPayload.limits?.io,
          cpu: buildPayload.cpu || buildPayload.limits?.cpu,
          threads: buildPayload.threads || server.threads,
          allocationId: buildPayload.allocation,
          databaseLimit: buildPayload.feature_limits.databases,
          backupLimit: buildPayload.feature_limits.backups,
          allocationLimit: buildPayload.feature_limits.allocations,
        })
        await server.save()
        return serverTransformer(server)

      case 'PATCH startup':
        const startupPayload = await request.validateUsing(startupValidator)
        server.merge({
          startup: startupPayload.startup,
          eggId: startupPayload.egg,
          image: startupPayload.image,
          skipScripts: startupPayload.skip_scripts || server.skipScripts,
        })
        await server.save()
        return serverTransformer(server)

      case 'POST suspend':
        server.status = 'suspended'
        await server.save()
        response.noContent()
        break

      case 'POST unsuspend':
        server.status = null
        await server.save()
        response.noContent()
        break

      case 'POST reinstall':
        response.noContent()
        break

      case 'DELETE force':
        await server.delete()
        break

      default:
        response.status(404).json({
          message: `Cannot ${method} ${url}`,
          name: 'Exception',
          status: 404,
        })
    }
  }
}
