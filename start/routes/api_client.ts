import router from '@adonisjs/core/services/router'

const ClientController = () => import('#controllers/api/client/client_controller')
const ApiKeysController = () => import('#controllers/api/client/account/api_keys_controller')
const AccountController = () => import('#controllers/api/client/account/account_controller')
const SshKeysController = () => import('#controllers/api/client/account/ssh_keys_controller')
const ServersController = () => import('#controllers/api/client/servers/servers_controller')
const StartupController = () => import('#controllers/api/client/servers/startup_controller')
const SettingsController = () => import('#controllers/api/client/servers/settings_controller')

router
  .group(() => {
    router.get('/', [ClientController, 'index'])
    router.get('permissions', [ClientController, 'permissions'])
  })
  .prefix('api/client')

router
  .group(() => {
    router.resource('api_keys', ApiKeysController).only(['index', 'store', 'destroy'])
    router.get('/', [AccountController, 'index'])
    router.put('email', [AccountController, 'updateEmail'])
    router.put('password', [AccountController, 'updatePassword'])
    router.get('activity', [AccountController, 'activity'])
    router.resource('ssh_keys', SshKeysController).only(['index', 'store'])
    router.post('ssh_keys/remove', [SshKeysController, 'destroy'])
  })
  .prefix('api/client/account')

router
  .group(() => {
    router.get('/', [ServersController, 'index']).as('client.servers.index')
    router.get('websocket', [ServersController, 'websocket'])
    router.get('resources', [ServersController, 'resources'])
    router.get('activity', [ServersController, 'activity'])
    router.post('power', [ServersController, 'power'])
    router.post('command', [ServersController, 'command'])
    router.get('startup', [StartupController, 'index'])
    router.put('startup/variable', [StartupController, 'update'])
    router.post('settings/rename', [SettingsController, 'rename'])
    router.post('settings/reinstall', [SettingsController, 'reinstallServer'])
    router.put('settings/docker-image', [SettingsController, 'updateImage'])
  })
  .prefix('api/client/servers/:server_id')
