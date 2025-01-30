import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async index({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async store({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
    } catch {
      return response.status(401).json({ message: 'Invalid credentials' })
    }

    return response.redirect().toRoute('index')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('auth.login.index')
  }
}
