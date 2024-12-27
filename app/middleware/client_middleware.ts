import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ClientMiddleware {
  async handle({ inertia, auth, route, params }: HttpContext, next: NextFn) {
    await auth.authenticateUsing(['web'])

    inertia.share({
      user: auth.user!,
      route: route?.name!,
      params,
    })

    return next()
  }
}
