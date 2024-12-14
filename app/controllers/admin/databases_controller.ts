import { HttpContext } from '@adonisjs/core/http'

export default class DatabasesController {
  async index({ view }: HttpContext) {
    return view.render('admin/databases/index')
  }

  async store({ view }: HttpContext) {}
}
