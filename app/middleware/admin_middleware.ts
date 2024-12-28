import Setting from '#models/setting'
import { md5 } from '#utils/admin/user'
import { formatDate } from '#utils/index'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const settings = await Setting.all()
    const config = settings
      .map((setting) => {
        return { [setting.key]: setting.value }
      })
      .reduce((acc, curr) => {
        return { ...acc, ...curr }
      }, {})
    if (!config['app:name']) {
      config['app:name'] = 'SwiftPanel'
    }
    ctx.view.share({
      formatDate,
      config,
      md5,
    })
    return next()
  }
}
