import nestNotices from '#langs/en/admin/nest'
import exceptions from '#langs/en/exceptions'
import Nest from '#models/nest'
import EggImportTransformer from '#transformers/admin/egg/import'
import { notify, notifyError } from '#utils/admin/admin'
import { importEggFormValidator, nestValidator } from '#validators/admin/nests'
import { HttpContext } from '@adonisjs/core/http'
import { ModelPaginator } from '@adonisjs/lucid/orm'
import { readFileSync } from 'node:fs'

export default class NestsController {
  async index({ view }: HttpContext) {
    const data = await Nest.query().withCount('servers').withCount('eggs').paginate(1, 50)
    const nests = data.map((d) => {
      const nest = d.serialize()
      return {
        ...nest,
        servers_count: d.$extras.servers_count,
        eggs_count: d.$extras.eggs_count,
      }
    }) as ModelPaginator
    return view.render('admin/nests/index', { nests, meta: nests.getMeta() })
  }

  async create({ view }: HttpContext) {
    return view.render('admin/nests/new')
  }

  async show({ view, params }: HttpContext) {
    const id = params.id
    const nest = await Nest.query()
      .preload('eggs', (e) => e.withCount('servers'))
      .where('id', id)
      .firstOrFail()
    const eggs = nest.eggs.map((egg) => {
      const e = egg.serialize()
      return {
        ...e,
        servers_count: egg.$extras.servers_count,
      }
    })
    return view.render('admin/nests/view', { nest, eggs })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(nestValidator)
    const { id } = await Nest.create(payload)
    notify(session, nestNotices.notices.created.replace(':name', payload.name))

    return response.redirect().toRoute('admin.nests.show', { id })
  }

  async importEgg({ request, response, session }: HttpContext) {
    const { importFile, importToNest } = await request.validateUsing(importEggFormValidator)
    const nest = await Nest.findOrFail(importToNest)
    const tmpPath = importFile?.tmpPath
    if (!tmpPath) {
      notifyError(session, exceptions.nest.importer.file_error)
      return response.redirect().back()
    }
    const content = readFileSync(tmpPath)
    const data = await EggImportTransformer(JSON.parse(content.toString()))
    const egg = await nest.related('eggs').create(data)
    egg.related('eggVariables').createMany(data.eggVariables)

    notify(session, nestNotices.eggs.notices.imported)
    return response.redirect().toRoute('admin.nests.egg.show', { id: egg.id })
  }

  async update({
    request,
    response,
    session,
    params,
  }: Pick<HttpContext, 'request' | 'response' | 'session'> & { params: { id: string } }) {
    const id = params.id
    const payload = await request.validateUsing(nestValidator)
    const nest = await Nest.findOrFail(id)
    nest.merge(payload)
    await nest.save()
    notify(session, nestNotices.notices.updated.replace(':name', nest.name))

    return response.redirect().toRoute('admin.nests.show', { id })
  }

  async destroy({
    response,
    session,
    params,
  }: Pick<HttpContext, 'response' | 'session'> & { params: { id: string } }) {
    const id = params.id
    const nest = await Nest.query()
      .withCount('servers')
      .withCount('eggs')
      .where('id', id)
      .firstOrFail()
    if (nest.$extras.servers_count > 0) {
      notifyError(session, exceptions.nest.delete_has_servers)
      return response.redirect().back()
    }
    if (nest.$extras.eggs_count > 0) {
      notifyError(session, exceptions.nest.has_children)
      return response.redirect().back()
    }
    await nest.delete()
    notify(session, nestNotices.notices.deleted.replace(':name', nest.name))

    return response.redirect().toRoute('admin.nests.index')
  }
}
