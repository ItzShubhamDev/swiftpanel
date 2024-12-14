import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async index({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async store({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.redirect().toRoute('index')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    console.log('Logged out')

    return response.redirect().toRoute('auth.index')
  }
}
