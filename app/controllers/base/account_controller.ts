import { HttpContext } from '@adonisjs/core/http'

export default class AccountController {
  async index({ inertia }: HttpContext) {
    return ''
    // return inertia.render('account/index')
  }
}
