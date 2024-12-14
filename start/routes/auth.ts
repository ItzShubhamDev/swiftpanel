import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth/auth_controller')

router
  .group(() => {
    router.resource('login', AuthController).only(['index', 'store']).use('*', middleware.guest())
    router.post('logout', [AuthController, 'logout']).as('logout')
  })
  .prefix('auth')
  .as('auth')
