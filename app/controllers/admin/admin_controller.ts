import { getLatestVersion } from '#utils/admin/admin'
import { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  async index({ view }: HttpContext) {
    const version = process.env.npm_package_version
    const latest = await getLatestVersion()
    const panel = {
      version,
      latest,
    }
    return view.render('admin/index', { panel })
  }
}
