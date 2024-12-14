import { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  async index({ view }: HttpContext) {
    return view.render('admin/index')
  }
}
