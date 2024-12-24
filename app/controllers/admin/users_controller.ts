import User from '#models/user'
import UserJsonTransformer from '#transformers/admin/user/json'
import { md5 } from '#utils/admin/user'
import { HttpContext } from '@adonisjs/core/http'
import { ModelPaginator } from '@adonisjs/lucid/orm'

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

  async store({ view }: HttpContext) {}

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
