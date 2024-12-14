import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AccountController = () => import('#controllers/base/account_controller')
const ServersController = () => import('#controllers/base/servers_controller')

router
  .group(() => {
    router.on('/').renderInertia('dashboard').as('index')
    router.get('account', [AccountController, 'index']).as('account.index')
    router.get('account/*', [AccountController, 'index']).as('account.*')
    router.get('servers/*', [ServersController, 'index']).as('servers.*')
  })
  .use(middleware.auth({ guards: ['web'] }))
