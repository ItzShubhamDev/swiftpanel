import Setting from '#models/setting'
import { notify } from '#utils/admin/admin'
import { HttpContext } from '@adonisjs/core/http'

export default class SettingsController {
  async index({ view }: HttpContext) {
    return view.render('admin/settings/index')
  }

  async store({ request, response, session }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _csrf, _method, ...settings } = request.body()
    for (const key in settings) {
      await Setting.updateOrCreate({ key }, { value: settings[key] })
    }
    notify(
      session,
      'Panel settings have been updated successfully and the queue worker was restarted to apply these changes.'
    )
    return response.redirect().toRoute('admin.settings.index')
  }
}
