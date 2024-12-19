import Location from '#models/location'
import Node from '#models/node'
import { notify, notifyError } from '#utils/admin/admin'
import { getYamlConfig } from '#utils/admin/node'
import { decrypt, unique } from '#utils/index'
import {
  aliasValidator,
  createAllocationValidator,
  deleteAllocationsValidator,
  removeBlockValidator,
} from '#validators/admin/nodes'
import { HttpContext } from '@adonisjs/core/http'
import nodeNotices from '#langs/en/admin/node'
import exceptions from '#langs/en/exceptions'

export default class NodesInfoController {
  async settings({ params, view }: HttpContext) {
    const node = await Node.findOrFail(params.id)
    const locations = await Location.all()

    return view.render('admin/nodes/settings', { node, locations })
  }

  async configuration({ params, view, request }: HttpContext) {
    const node = await Node.findOrFail(params.id)
    node.daemonToken = decrypt(node.daemonToken)
    const url = request.completeUrl().split('/admin/')[0]
    const config = getYamlConfig(node, url)

    return view.render('admin/nodes/configuration', { node, config })
  }

  async allocation({ request, params, view }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('per_page', 50)
    const node = await Node.findOrFail(params.id)

    const allocations = await node
      .related('allocations')
      .query()
      .preload('server', (s) => s.select('name'))
      .paginate(page, limit)
    const ips = unique(allocations.map((a) => a.ip))

    return view.render('admin/nodes/allocations', {
      node,
      allocations,
      ips,
      pagination: allocations.serialize().meta,
    })
  }

  async servers({ params, view, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('per_page', 50)

    const node = await Node.query().where('id', params.id).firstOrFail()

    const servers = await node
      .related('servers')
      .query()
      .preload('owner', (o) => o.select('username'))
      .preload('nest', (n) => n.select('name'))
      .preload('egg', (e) => e.select('name'))
      .paginate(page, limit)

    return view.render('admin/nodes/servers', {
      node,
      servers,
      pagination: servers.serialize().meta,
    })
  }

  async alias({ params, request, response }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { alias, allocation_id } = await request.validateUsing(aliasValidator)

    const node = await Node.findOrFail(params.id)
    await node.related('allocations').query().where('id', allocation_id).update({ ip_alias: alias })

    return response.noContent()
  }

  async removeBlock({ params, request, response, session }: HttpContext) {
    const { ip } = await request.validateUsing(removeBlockValidator)

    const node = await Node.findOrFail(params.id)
    await node.related('allocations').query().where('ip', ip).whereNull('server_id').delete()

    notify(session, nodeNotices.notices.unallocated_deleted.replace(':ip', ip))

    return response.redirect().toRoute('admin.nodes.allocations.index', { id: node.id })
  }

  async removeAllocation({ params, response }: HttpContext) {
    const node = await Node.findOrFail(params.id)
    node.related('allocations').query().where('id', params.a_id).delete()

    return response.noContent()
  }

  async createAllocation({ params, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createAllocationValidator)
    const node = await Node.query()
      .preload('allocations', (a) => a.select('ip', 'port'))
      .where('id', params.id)
      .firstOrFail()

    const allocations = payload.allocation_ports
      .map((port) => {
        if (typeof port === 'number') {
          return {
            ip: payload.allocation_ip,
            port,
            serverId: null,
            ip_alias: payload.allocation_alias,
          }
        } else {
          let [from, to] = port.split('-').map(Number)
          if (from > to) {
            ;[from, to] = [to, from]
          } else if (from < 1024 || to > 65535) {
            notifyError(session, exceptions.allocations.port_out_of_range)
            return []
          } else if (to - from > 1000) {
            notifyError(session, exceptions.allocations.too_many_ports)
            return []
          }
          return Array.from({ length: to - from + 1 }, (_, i) => from + i).map((p) => {
            return {
              ip: payload.allocation_ip,
              port: p,
              serverId: null,
              ip_alias: payload.allocation_alias,
            }
          })
        }
      })
      .flat()
      .filter(
        (allocation) =>
          !node.allocations.find((a) => a.ip === allocation.ip && a.port === allocation.port)
      )

    await node.related('allocations').createMany(allocations)
    if (allocations.length !== 0) {
      notify(session, nodeNotices.notices.allocations_added)
    }
    return response.redirect().toRoute('admin.nodes.allocations.index', { id: node.id })
  }

  async deleteAllocation({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(deleteAllocationsValidator)

    const ids = payload.allocations.map((item) => item.id)
    const node = await Node.findOrFail(params.id)

    await node.related('allocations').query().whereIn('id', ids).delete()

    return response.noContent()
  }
}
