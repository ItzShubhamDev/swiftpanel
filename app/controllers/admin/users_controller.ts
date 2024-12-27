import User from '#models/user'
import UserJsonTransformer from '#transformers/admin/user/json'
import { notify } from '#utils/admin/admin'
import { createUserValidator } from '#validators/admin/user'
import { HttpContext } from '@adonisjs/core/http'
import { ModelPaginator } from '@adonisjs/lucid/orm'
import userNotices from '#langs/en/admin/user'

export default class UsersController {
  async index({ view }: HttpContext) {
    const data = await User.query().withCount('servers').withCount('subusers').paginate(1, 50)
    const users = data.map((user) => {
      const u = user.serialize()
      return {
        ...u,
        servers_count: user.$extras.servers_count,
        subusers_count: user.$extras.subusers_count,
      }
    }) as ModelPaginator
    return view.render('admin/users/index', { users, meta: users.getMeta() })
  }

  async show({ view, params }: HttpContext) {
    const user = await User.query().preload('servers').where('id', params.id).firstOrFail()
    return view.render('admin/users/show', { user: user.serialize() })
  }

  async create({ view }: HttpContext) {
    return view.render('admin/users/create')
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = await User.create({
      ...payload,
      password: payload.password || '',
      useTotp: false,
    })
    notify(session, userNotices.notices.account_created)
    return response.redirect().toRoute('admin.users.show', { id: user.id })
  }

  async destroy({ response, params }: HttpContext) {
    const user = await User.findByOrFail('id', params.id)
    await user.delete()
    return response.redirect().toRoute('admin.users.index')
  }

  async json({ request, response }: HttpContext) {
    const query = request.qs()
    if (query.user_id) {
      const user = await User.findByOrFail('id', query.user_id)
      return response.json(UserJsonTransformer(user))
    }

    const users = await User.query()
      .where('email', 'LIKE', `%${query.filter ? query.filter.email : ''}%`)
      .exec()

    return response.json(users.map((user) => UserJsonTransformer(user)))
  }
}
