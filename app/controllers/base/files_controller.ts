import { HttpContext } from '@adonisjs/core/http'

export default class FilesController {
  async index({ params, inertia }: HttpContext) {
    return inertia.render('server/files/index', { params })
  }

  async edit({ params, inertia }: HttpContext) {
    return inertia.render('server/files/edit', { params })
  }

  async new({ params, inertia }: HttpContext) {
    return inertia.render('server/files/new', { params })
  }
}
