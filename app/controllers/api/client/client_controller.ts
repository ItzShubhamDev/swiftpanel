import { pagination } from '#utils/index'
import serverTransformer from '#transformers/api/client/server'
import Server from '#models/server'
import { HttpContext } from '@adonisjs/core/http'

export default class CLientController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 50)
    const servers = await Server.query().preload('node').where('owner_id', 1).paginate(page, limit)

    const response = {
      object: 'list',
      data: servers.serialize().data.map((n) => {
        return serverTransformer(n as Server)
      }),
      meta: {
        pagination: pagination(
          servers.total,
          servers.perPage,
          servers.currentPage,
          servers.lastPage,
          '/'
        ),
      },
    }

    return response
  }

  async permissions({}: HttpContext) {
    return {
      object: 'system_permissions',
      attributes: {
        permissions: {
          websocket: {
            description:
              'Allows the user to connect to the server websocket, giving them access to view console output and realtime server stats.',
            keys: {
              connect:
                'Allows a user to connect to the websocket instance for a server to stream the console.',
            },
          },
          control: {
            description:
              "Permissions that control a user's ability to control the power state of a server, or send commands.",
            keys: {
              console: 'Allows a user to send commands to the server instance via the console.',
              start: 'Allows a user to start the server if it is stopped.',
              stop: 'Allows a user to stop a server if it is running.',
              restart:
                'Allows a user to perform a server restart. This allows them to start the server if it is offline, but not put the server in a completely stopped state.',
            },
          },
          user: {
            description:
              'Permissions that allow a user to manage other subusers on a server. They will never be able to edit their own account, or assign permissions they do not have themselves.',
            keys: {
              create: 'Allows a user to create new subusers for the server.',
              read: 'Allows the user to view subusers and their permissions for the server.',
              update: 'Allows a user to modify other subusers.',
              delete: 'Allows a user to delete a subuser from the server.',
            },
          },
          file: {
            description:
              "Permissions that control a user's ability to modify the filesystem for this server.",
            keys: {
              create:
                'Allows a user to create additional files and folders via the Panel or direct upload.',
              read: 'Allows a user to view the contents of a directory and read the contents of a file. Users with this permission can also download files.',
              update: 'Allows a user to update the contents of an existing file or directory.',
              delete: 'Allows a user to delete files or directories.',
              archive:
                'Allows a user to archive the contents of a directory as well as decompress existing archives on the system.',
              sftp: 'Allows a user to connect to SFTP and manage server files using the other assigned file permissions.',
            },
          },
          backup: {
            description:
              "Permissions that control a user's ability to generate and manage server backups.",
            keys: {
              create: 'Allows a user to create new backups for this server.',
              read: 'Allows a user to view all backups that exist for this server.',
              update: '',
              delete: 'Allows a user to remove backups from the system.',
              download: 'Allows a user to download backups.',
            },
          },
          allocation: {
            description:
              "Permissions that control a user's ability to modify the port allocations for this server.",
            keys: {
              read: 'Allows a user to view the allocations assigned to this server.',
              create: 'Allows a user to assign additional allocations to the server.',
              update:
                'Allows a user to change the primary server allocation and attach notes to each allocation.',
              delete: 'Allows a user to delete an allocation from the server.',
            },
          },
          startup: {
            description:
              "Permissions that control a user's ability to view this server's startup parameters.",
            keys: {
              read: '',
              update: '',
            },
          },
          database: {
            description:
              "Permissions that control a user's access to the database management for this server.",
            keys: {
              create: 'Allows a user to create a new database for this server.',
              read: 'Allows a user to view the database associated with this server.',
              update:
                'Allows a user to rotate the password on a database instance. If the user does not have the view_password permission they will not see the updated password.',
              delete: 'Allows a user to remove a database instance from this server.',
              view_password:
                'Allows a user to view the password associated with a database instance for this server.',
            },
          },
          schedule: {
            description:
              "Permissions that control a user's access to the schedule management for this server.",
            keys: {
              create: '',
              read: '',
              update: '',
              delete: '',
            },
          },
          settings: {
            description:
              "Permissions that control a user's access to the settings for this server.",
            keys: {
              rename: '',
              reinstall: '',
            },
          },
        },
      },
    }
  }
}
