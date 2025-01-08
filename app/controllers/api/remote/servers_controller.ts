import Server from '#models/server'
import serverTransformer from '#transformers/api/remote/server'
import { wingsPagination } from '#utils/api/remote/servers'
import {
  STATUS_INSTALL_FAILED,
  STATUS_INSTALLING,
  STATUS_REINSTALL_FAILED,
  STATUS_RESTORING_BACKUP,
  STATUS_SUSPENDED,
} from '#utils/variables'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

type Data = ReturnType<typeof serverTransformer>

export default class ServerController {
  async index({ request, response, node }: HttpContext) {
    const page = request.input('page', 1) < 1 ? 1 : request.input('page', 1)
    const perPage = request.input('per_page', 50)

    if (!node) {
      return response.forbidden('Unauthorized')
    }

    const servers = await Server.query()
      .where('nodeId', node.id)
      .preload('node', (n) => n.preload('location'))
      .preload('allocations')
      .preload('egg')
      .preload('serverVariables', (v) => v.preload('variable'))
      .paginate(page, perPage)
    const pagination = wingsPagination(
      servers.total,
      servers.perPage,
      servers.currentPage,
      servers.lastPage,
      '/api/remote/servers'
    )

    const data = [] as Data[]

    servers.forEach((server) => {
      const transformed = serverTransformer(server as Server)
      data.push(transformed)
    })

    const res = {
      data,
      links: pagination.links,
      meta: pagination.meta,
    }

    return res
  }

  async show({ params }: HttpContext) {
    const server = await Server.query()
      .where('uuid', params.id)
      .preload('node', (n) => n.preload('location'))
      .preload('allocations')
      .preload('egg')
      .preload('serverVariables', (v) => v.preload('variable'))
      .firstOrFail()

    const { uuid, ...data } = serverTransformer(server)
    return data
  }

  async install({ params }: HttpContext) {
    const server = await Server.query().where('uuid', params.id).preload('egg').firstOrFail()
    return {
      container_image: server.image,
      entrypoint: server.egg.scriptEntry,
      script: server.egg.scriptInstall,
    }
  }

  async installStore({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(
      vine.compile(vine.object({ successful: vine.boolean(), reinstall: vine.boolean() }))
    )
    const server = await Server.query().where('uuid', params.id).firstOrFail()
    let status = null

    if (!payload.successful) {
      status = STATUS_INSTALL_FAILED
      if (payload.reinstall) {
        status = STATUS_REINSTALL_FAILED
      }
    }

    if (server.status === STATUS_SUSPENDED) {
      status = STATUS_SUSPENDED
    }

    await server.merge({ status, installedAt: DateTime.fromISO(new Date().toISOString()) }).save()

    return response.noContent()
  }

  async reset({ response, node }: HttpContext) {
    if (!node) {
      return response.forbidden('Unauthorized')
    }
    await Server.query()
      .whereIn('status', [STATUS_INSTALLING, STATUS_RESTORING_BACKUP])
      .andWhere('nodeId', node.id)
      .update({ status: null })

    return response.noContent()
  }
}
