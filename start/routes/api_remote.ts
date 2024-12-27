import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const ServerController = () => import('#controllers/api/remote/servers_controller')
const ActivityController = () => import('#controllers/api/remote/activity_controller')

router
  .group(() => {
    router.resource('servers', ServerController).only(['index', 'show']).as('remote.servers')
    router.post('servers/reset', [ServerController, 'reset'])
    router.get('servers/:id/install', [ServerController, 'install'])
    router.post('servers/:id/install', [ServerController, 'installStore'])
    router.resource('activity', ActivityController).only(['index'])
  })
  .prefix('api/remote')
  .use(middleware.wings())
