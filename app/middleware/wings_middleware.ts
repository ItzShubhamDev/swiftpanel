import Node from '#models/node'
import { decrypt } from '#utils/index'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    node?: Node | undefined
  }
}

export default class WingsMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const auth = ctx.request.header('Authorization')
    if (!auth) return ctx.response.forbidden('Unauthorized')

    const [type, token] = auth.split(' ')
    if (type !== 'Bearer') return ctx.response.forbidden('Unauthorized')

    const [id, key] = token.split('.')
    if (!id || !key) return ctx.response.forbidden('Unauthorized')

    const node = await Node.query().where('daemonTokenId', id).first()
    if (!node) return ctx.response.forbidden('Unauthorized')

    const secret = decrypt(node.daemonToken)
    if (secret !== key) return ctx.response.forbidden('Unauthorized')

    ctx.node = node
    return next()
  }
}
