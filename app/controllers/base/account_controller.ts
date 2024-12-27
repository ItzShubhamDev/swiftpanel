import { HttpContext } from '@adonisjs/core/http'

export default class AccountController {
  async index({ response }: HttpContext) {
    return response.notImplemented()
    // return inertia.render('account/index')
  }
}
