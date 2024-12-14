import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AdminController = () => import('#controllers/admin/admin_controller')

const SettingsController = () => import('#controllers/admin/settings/settings_controller')
const MailsController = () => import('#controllers/admin/settings/mail_controller')
const ApiController = () => import('#controllers/admin/api_controller')

const DatabasesController = () => import('#controllers/admin/databases_controller')

const LocationsController = () => import('#controllers/admin/locations_controller')
const NodesController = () => import('#controllers/admin/nodes/nodes_controller')
const NodesInfoController = () => import('#controllers/admin/nodes/info_controller')

const ServersController = () => import('#controllers/admin/servers/servers_controller')

const UsersController = () => import('#controllers/admin/users_controller')

const NestsController = () => import('#controllers/admin/nests/nests_controller')
const EggsController = () => import('#controllers/admin/nests/eggs_controller')
const EggVariablesController = () => import('#controllers/admin/nests/egg_variables_controller')
const EggScriptsController = () => import('#controllers/admin/nests/egg_scripts_controller')

router
  .group(() => {
    router.get('/', [AdminController, 'index']).as('index')
    router.resource('settings', SettingsController).only(['index', 'store'])
    router
      .group(() => {
        router.get('mail', [MailsController, 'index']).as('mail')
        router.get('advanced', [MailsController, 'index']).as('advanced')
      })
      .prefix('settings')
      .as('settings')
    router
      .group(() => {
        router.get('/', [ApiController, 'index']).as('index')
        router.get('new', [ApiController, 'new']).as('new')
        router.post('new', [ApiController, 'create']).as('new.store')
        router.delete('revoke/:id', [ApiController, 'delete']).as('delete')
      })
      .prefix('api')
      .as('api')
    router
      .group(() => {
        router.get('/', [DatabasesController, 'index']).as('index')
        router.post('/', [DatabasesController, 'store']).as('store')
        router.get(':id', [DatabasesController, 'index']).as('view')
      })
      .prefix('databases')
      .as('databases')
    router
      .resource('locations', LocationsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
    router
      .resource('nodes', NodesController)
      .only(['index', 'store', 'show', 'update', 'destroy', 'create'])
    router
      .group(() => {
        router.get('/settings', [NodesInfoController, 'settings']).as('settings')
        router.get('/configuration', [NodesInfoController, 'configuration']).as('configuration')
        router.get('/allocation', [NodesInfoController, 'allocation']).as('allocation')
        router.get('/servers', [NodesInfoController, 'servers']).as('servers')
        router
          .post('/allocation', [NodesInfoController, 'createAllocation'])
          .as('allocation.create')
        router
          .post('/allocation/remove', [NodesInfoController, 'removeBlock'])
          .as('allocation.removeBlock')
        router
          .post('/allocation/:a_id/remove', [NodesInfoController, 'removeAllocation'])
          .as('allocation.remove')
        router
          .delete('/allocation', [NodesInfoController, 'deleteAllocation'])
          .as('allocation.delete')
      })
      .prefix('nodes/:id')
      .as('nodes')
    router
      .group(() => {
        router.get('/', [ServersController, 'index']).as('index')
        router.post('/', [ServersController, 'store']).as('new')
        router.get(':id', [ServersController, 'index']).as('view')
      })
      .prefix('servers')
      .as('servers')
    router
      .group(() => {
        router.get('/', [UsersController, 'index']).as('index')
        router.post('/', [UsersController, 'store']).as('new')
        router.get(':id', [UsersController, 'index']).as('view')
      })
      .prefix('users')
      .as('users')
    router
      .resource('nests', NestsController)
      .only(['index', 'create', 'show', 'destroy', 'update', 'store'])
    router.post('/nests/import', [NestsController, 'importEgg']).as('nests.import')
    router
      .group(() => {
        router
          .resource('eggs', EggsController)
          .only(['create', 'store', 'show', 'destroy', 'update'])
        router.post('/eggs/:id/import', [EggsController, 'importEgg']).as('eggs.import')
        router.get('/eggs/:id/export', [EggsController, 'export']).as('eggs.export')
        router
          .resource('eggs.variables', EggVariablesController)
          .only(['index', 'store', 'update', 'destroy'])
        router.resource('eggs.scripts', EggScriptsController).only(['index', 'store'])
      })
      .prefix('nests.eggs')
      .as('nests.eggs')
  })
  .prefix('admin')
  .as('admin')
  .use(middleware.auth({ guards: ['web'] }))
  .use(middleware.admin())
