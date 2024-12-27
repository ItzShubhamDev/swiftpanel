import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AccountController = () => import('#controllers/base/account_controller')
const ServersController = () => import('#controllers/base/servers_controller')
const FilesController = () => import('#controllers/base/files_controller')

router
  .group(() => {
    router.on('/').renderInertia('dashboard').as('index')
    router.get('account', [AccountController, 'index']).as('account.index')
    router.get('account/*', [AccountController, 'index']).as('account.*')
    router
      .group(() => {
        router.get('/', [ServersController, 'index']).as('index')
        router.get('files/edit/*', [FilesController, 'edit']).as('files.edit')
        router.get('files/new', [FilesController, 'new']).as('files.new.index')
        router.get('files/new/*', [FilesController, 'new']).as('files.new')
        router.get('files', [FilesController, 'index']).as('files.index')
        router.get('files/*', [FilesController, 'index']).as('files.show')
        router.get('startup', [ServersController, 'startup']).as('startup')
        router.get('settings', [ServersController, 'settings']).as('settings')
      })
      .prefix('server/:id')
      .as('server')
  })
  .use(middleware.auth({ guards: ['web'] }))
  .use(middleware.user())
