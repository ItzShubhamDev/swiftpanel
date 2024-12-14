import Node from '#models/node'
import { notify, notifyError } from '#utils/admin/admin'
import { getUsage } from '#utils/admin/node'
import { createNodeValidator, updateNodeValidator } from '#validators/admin/nodes'
import { HttpContext } from '@adonisjs/core/http'
import nodeNotices from '#langs/en/admin/node'
import Location from '#models/location'
import exceptions from '#langs/en/exceptions'

export default class NodesController {
  async index({ view }: HttpContext) {
    const data = await Node.query().withCount('servers').preload('location').exec()
    const nodes = data.map((node) => {
      const n = node.serialize()
      return {
        ...n,
        servers_count: node.$extras.servers_count,
      }
    })
    return view.render('admin/nodes/index', { nodes })
  }

  async show({ view, params }: HttpContext) {
    const data = await Node.query()
      .withCount('servers')
      .preload('location')
      .where('id', params.id)
      .firstOrFail()
    const node = {
      ...data.serialize(),
      servers_count: data.$extras.servers_count,
    }
    const stats = await getUsage(data)
    return view.render('admin/nodes/view', { node, stats })
  }

  async update({ request, response, params, session }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { reset_secret, ...payload } = await request.validateUsing(updateNodeValidator)
    const node = await Node.findOrFail(params.id)

    node.merge(payload)

    if (reset_secret) {
      Node.assignDaemonToken(node)
    }

    await node.save()

    notify(session, nodeNotices.notices.node_updated)
    return response.redirect().toRoute('admin.nodes.settings', { id: node.id })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createNodeValidator)
    const node = await Node.create(payload)

    notify(session, nodeNotices.notices.node_created)
    return response.redirect().toRoute('admin.nodes.show', { id: node.id })
  }

  async create({ view }: HttpContext) {
    const locations = await Location.all()
    return view.render('admin/nodes/new', { locations })
  }

  async destroy({ response, params, session }: HttpContext) {
    const node = await Node.query().withCount('servers').where('id', params.id).firstOrFail()
    if (node.$extras.servers_count > 0) {
      notifyError(session, exceptions.node.servers_attached)
      return response.redirect().back()
    }
    await node.delete()

    notify(session, nodeNotices.notices.node_deleted)
    return response.redirect().toRoute('admin.nodes.index')
  }
}
