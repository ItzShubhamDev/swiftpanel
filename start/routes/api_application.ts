import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/api/application/users/users_controller')
const ExternalUsersController = () =>
  import('#controllers/api/application/users/external_users_controller')
const NodesController = () => import('#controllers/api/application/nodes/nodes_controller')
const NodesContifurationController = () =>
  import('#controllers/api/application/nodes/nodes_configuration_controller')
const AllocationController = () =>
  import('#controllers/api/application/nodes/allocations_controller')
const LocationsController = () =>
  import('#controllers/api/application/locations/locations_controller')
const ServersController = () => import('#controllers/api/application/servers/servers_controller')
const ServerOperationsController = () =>
  import('#controllers/api/application/servers/server_operations_controller')
const DatabasesController = () =>
  import('#controllers/api/application/servers/databases_controller')
const NestsController = () => import('#controllers/api/application/nests/nests_controller')
const EggsController = () => import('#controllers/api/application/nests/eggs_controller')

router
  .group(() => {
    router.resource('users', UsersController).apiOnly()
    router.get('users/external/:id', [ExternalUsersController, 'show'])
    router.resource('nodes', NodesController).apiOnly()
    router.get('nodes/:id/configuration', [NodesContifurationController, 'index'])
    router.resource('nodes.allocations', AllocationController).only(['index', 'store', 'destroy'])
    router.resource('locations', LocationsController).apiOnly()
    router.resource('servers', ServersController).apiOnly().as('application.servers')
    router.any('servers/:id/:operation', [ServerOperationsController])
    router
      .resource('servers.databases', DatabasesController)
      .only(['index', 'show', 'store', 'destroy'])
    router.resource('nests', NestsController).only(['index', 'show'])
    router.resource('nests.eggs', EggsController).only(['index', 'show'])
  })
  .prefix('api/application')
  .use(middleware.auth({ guards: ['api'] }))
