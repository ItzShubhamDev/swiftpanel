import { HttpContext } from '@adonisjs/core/http'

export default class DatabasesController {
  async index({ response }: HttpContext) {
    return response.notImplemented()
    // return view.render('admin/databases/index')
  }
}
