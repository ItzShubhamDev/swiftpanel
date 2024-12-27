import nest from '#langs/en/admin/nest'
import exceptions from '#langs/en/exceptions'
import Egg from '#models/egg'
import EggVariable from '#models/egg_variable'
import { notify, notifyError } from '#utils/admin/admin'
import { reservedNames } from '#utils/variables'
import { variableValidator } from '#validators/admin/eggs'
import { HttpContext } from '@adonisjs/core/http'

export default class EggVariablesController {
  async index({ view, params }: HttpContext) {
    const id = params.egg_id
    const egg = await Egg.query()
      .preload('nest')
      .preload('eggVariables')
      .where('id', id)
      .firstOrFail()
    return view.render('admin/eggs/variables', { egg })
  }

  async store({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(variableValidator)
    const egg = await Egg.findOrFail(params.egg_id)

    if (reservedNames.includes(payload.name.toUpperCase())) {
      notifyError(session, exceptions.nest.variables.reserved_name.replace(':name', payload.name))
      return response.redirect().back()
    }
    if (await egg.related('eggVariables').query().where('name', payload.name).first()) {
      notifyError(
        session,
        exceptions.nest.variables.env_not_unique.replace(':name', payload.envVariable)
      )
      return response.redirect().back()
    }
    const permissions = payload.options ?? []

    await EggVariable.create({
      eggId: egg.id,
      ...payload,
      userEditable: permissions.includes('user_editable'),
      userViewable: permissions.includes('user_viewable'),
    })

    notify(session, nest.variables.notices.variable_created)
    return response.redirect().toRoute('admin.nests.egg.variables.index', { egg_id: egg.id })
  }

  async update({ request, response, params, session }: HttpContext) {
    const { options, ...payload } = await request.validateUsing(variableValidator)
    const egg = await Egg.findOrFail(params.egg_id)
    if (reservedNames.includes(payload.name.toUpperCase())) {
      notifyError(session, exceptions.nest.variables.reserved_name.replace(':name', payload.name))
      return response.redirect().back()
    }
    const variable = await egg.related('eggVariables').query().where('id', params.id).firstOrFail()

    variable.merge({
      ...payload,
      userEditable: options?.includes('user_editable'),
      userViewable: options?.includes('user_viewable'),
    })

    await variable.save()
    notify(session, nest.variables.notices.variable_updated.replace(':variable', variable.name))

    return response.redirect().toRoute('admin.nests.egg.variables.index', { egg_id: egg.id })
  }

  async destroy({ params, response, session }: HttpContext) {
    const egg = await Egg.findOrFail(params.egg_id)
    const variable = await egg.related('eggVariables').query().where('id', params.id).firstOrFail()
    await variable.delete()
    notify(session, nest.variables.notices.variable_deleted.replace(':variable', variable.name))
    return response.redirect().toRoute('admin.nests.egg.variables.index', { egg_id: egg.id })
  }
}
