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
const ServersViewController = () => import('#controllers/admin/servers/view_controller')

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
    router.resource('locations', LocationsController).except(['create', 'edit'])
    router.resource('nodes', NodesController).except(['edit'])
    router
      .group(() => {
        router.get('/settings', [NodesInfoController, 'settings']).as('settings')
        router.get('/configuration', [NodesInfoController, 'configuration']).as('configuration')
        router.get('/servers', [NodesInfoController, 'servers']).as('servers')
        router
          .group(() => {
            router.get('/', [NodesInfoController, 'allocation']).as('index')
            router.post('/', [NodesInfoController, 'createAllocation']).as('store')
            router.post('/alias', [NodesInfoController, 'alias']).as('alias')
            router.post('/remove', [NodesInfoController, 'removeBlock']).as('removeBlock')
            router.delete('/remove/:a_id', [NodesInfoController, 'removeAllocation']).as('remove')
            router.delete('/', [NodesInfoController, 'deleteAllocation']).as('destory')
          })
          .prefix('allocations')
          .as('allocations')
      })
      .prefix('nodes/:id')
      .as('nodes')
    router.resource('servers', ServersController).except(['edit'])
    router
      .group(() => {
        router.get('/details', [ServersViewController, 'details']).as('details')
        router.patch('/details', [ServersViewController, 'updateDetails']).as('details.update')
        router.get('/build', [ServersViewController, 'build']).as('build')
        router.patch('/build', [ServersViewController, 'updateBuild']).as('build.update')
        router.get('/startup', [ServersViewController, 'startup']).as('startup')
        router.get('/database', [ServersViewController, 'database']).as('database')
        router.get('/mounts', [ServersViewController, 'mounts']).as('mounts')
        router.get('/manage', [ServersViewController, 'manage']).as('manage')
        router.get('/delete', [ServersViewController, 'delete']).as('delete')
      })
      .prefix('servers/:id')
      .as('servers')
    router
      .group(() => {
        router.get('/accounts.json', [UsersController, 'json']).as('json')
        router.get('/', [UsersController, 'index']).as('index')
        router.post('/', [UsersController, 'store']).as('new')
        router.get(':id', [UsersController, 'index']).as('view')
      })
      .prefix('users')
      .as('users')
    router.resource('nests', NestsController).except(['edit'])
    router.post('/nests/import', [NestsController, 'importEgg']).as('nests.import')
    router
      .group(() => {
        router.resource('eggs', EggsController).except(['edit', 'index'])
        router.post('/eggs/:id/import', [EggsController, 'importEgg']).as('eggs.import')
        router.get('/eggs/:id/export', [EggsController, 'export']).as('eggs.export')
        router
          .resource('eggs.variables', EggVariablesController)
          .only(['index', 'store', 'update', 'destroy'])
        router.resource('eggs.scripts', EggScriptsController).only(['index', 'store'])
      })
      .prefix('nests')
      .as('nests')
  })
  .prefix('admin')
  .as('admin')
  .use(middleware.auth({ guards: ['web'] }))
  .use(middleware.admin())
