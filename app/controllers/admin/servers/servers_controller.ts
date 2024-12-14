import Server from '#models/server'
import { HttpContext } from '@adonisjs/core/http'

export default class ServersController {
  async index({ view }: HttpContext) {
    const data = await Server.query()
      .preload('node', (n) => n.select('name'))
      .preload('owner', (o) => o.select('username'))
      .preload('allocations', (a) => a.select('ip', 'ip_alias', 'port').first())
      .paginate(1, 50)
    const servers = data.serialize()
    return view.render('admin/servers/index', { servers })
  }

  async store({ view }: HttpContext) {}
}
