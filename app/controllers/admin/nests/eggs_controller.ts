import Egg from '#models/egg'
import Nest from '#models/nest'
import { HttpContext } from '@adonisjs/core/http'
import { createValidator, updateValidator } from '#validators/admin/eggs'
import { notify, notifyError } from '#utils/admin/admin'
import nest from '#langs/en/admin/nest'
import { dockerStoreTransform, dockerShowTransform } from '#transformers/admin/egg/dockerimage'
import EggExportTransformer from '#transformers/admin/egg/export'
import exceptions from '#langs/en/exceptions'
import { readFileSync } from 'node:fs'
import EggImportTransformer from '#transformers/admin/egg/import'
import { importEggFormValidator } from '#validators/admin/eggs'
import EggVariable from '#models/egg_variable'

export default class EggsController {
  async create({ view }: HttpContext) {
    const nests = await Nest.query().preload('eggs', (e) => e.select('id', 'name', 'author'))
    return view.render('admin/eggs/new', { nests })
  }

  async export({ response, params }: HttpContext) {
    const id = params.id
    const egg = await Egg.query().preload('eggVariables').where('id', id).firstOrFail()
    response.header(
      'Content-Disposition',
      `attachment; filename=egg-${egg.name.toLowerCase()}.json`
    )
    return response.send(JSON.stringify(EggExportTransformer(egg), null, 2))
  }

  async importEgg({ params, request, response, session }: HttpContext) {
    const { importFile } = await request.validateUsing(importEggFormValidator)
    const egg = await Egg.findOrFail(params.id)
    const tmpPath = importFile?.tmpPath
    if (!tmpPath) {
      notifyError(session, exceptions.nest.importer.file_error)
      return response.redirect().back()
    }
    const content = readFileSync(tmpPath)
    const data = await EggImportTransformer(JSON.parse(content.toString()))
    await egg.merge(data).save()
    await EggVariable.query().where('egg_id', egg.id).delete()
    await egg.related('eggVariables').updateOrCreateMany(data.eggVariables)

    notify(session, nest.eggs.notices.imported)
    return response.redirect().toRoute('admin.nests.egg.show', { id: egg.id })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createValidator)
    const dockerImages = dockerStoreTransform(payload.dockerImages)
    const { id } = await Egg.create({ ...payload, author: 'test', dockerImages })
    notify(session, nest.eggs.notices.egg_created)
    return response.redirect().toRoute('admin.nests.egg.show', [id])
  }

  async show({ view, params }: HttpContext) {
    const id = params.id
    const egg = await Egg.query()
      .preload('nest', (n) => n.select('name').preload('eggs'))
      .where('id', id)
      .firstOrFail()
    const dockerImages = dockerShowTransform(egg.dockerImages)
    return view.render('admin/eggs/show', { egg, dockerImages })
  }

  async update({ request, response, session, params }: HttpContext) {
    const id = params.id
    const egg = await Egg.findOrFail(id)
    const payload = await request.validateUsing(updateValidator)
    const dockerImages = dockerStoreTransform(payload.dockerImages)
    egg.merge({ ...payload, dockerImages })
    await egg.save()
    notify(session, nest.eggs.notices.updated)
    return response.redirect().toRoute('admin.nests.egg.show', [id])
  }

  async destroy({ response, session, params }: HttpContext) {
    const id = params.id
    const egg = await Egg.query().withCount('servers').where('id', id).firstOrFail()
    if (egg.$extras.servers_count > 0) {
      notifyError(session, exceptions.nest.egg.delete_has_servers)
      return response.redirect().back()
    }
    await egg.delete()
    notify(session, nest.eggs.notices.deleted)
    return response.redirect().toRoute('admin.nests.show', [egg.nestId])
  }
}
