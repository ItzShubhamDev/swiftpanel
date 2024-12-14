import nest from '#langs/en/admin/nest'
import Egg from '#models/egg'
import { notify } from '#utils/admin/admin'
import { scriptValidator } from '#validators/admin/eggs'
import { HttpContext } from '@adonisjs/core/http'

export default class EggScriptsController {
  async index({ view, params }: HttpContext) {
    const id = params.egg_id
    const egg = await Egg.query().preload('nest').preload('copyFrom').where('id', id).firstOrFail()
    const copyFromOptions = await Egg.query()
      .where('nest_id', egg.nest.id)
      .andWhere('id', '!=', egg.id)
      .whereNull('copy_script_from')
      .select('id', 'name')
      .exec()
    const relyOnScript = await Egg.query()
      .where('nest_id', egg.nest.id)
      .andWhere('copy_script_from', egg.id)
      .select('id', 'name')
      .exec()
    return view.render('admin/eggs/scripts', { egg, copyFromOptions, relyOnScript })
  }

  async store({ request, response, params, session }: HttpContext) {
    const id = params.egg_id
    const payload = await request.validateUsing(scriptValidator)
    const egg = await Egg.findOrFail(id)
    egg.merge(payload)

    await egg.save()
    notify(session, nest.eggs.notices.script_updated)
    return response.redirect().back()
  }
}
