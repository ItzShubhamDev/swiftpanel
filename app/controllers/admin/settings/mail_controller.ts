import Setting from '#models/setting'
import { HttpContext } from '@adonisjs/core/http'

export default class MailController {
  async index({ view }: HttpContext) {
    return view.render('admin/settings/mail', {
      disabled: true,
    })
  }

  async update({ request, response }: HttpContext) {
    const settings = request.body()
    for (const key in settings) {
      await Setting.updateOrCreate({ key }, { value: settings[key] })
    }

    response.noContent()
  }
}
