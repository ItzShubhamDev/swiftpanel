import { HttpContext } from '@adonisjs/core/http'

export default class ServersController {
  async index({ inertia }: HttpContext) {
    return ''
    // return inertia.render('account/index')
  }
}
