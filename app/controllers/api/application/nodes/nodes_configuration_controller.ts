import { HttpContext } from '@adonisjs/core/http'
import Node from '#models/node'

export default class NodesContifurationController {
  async index({ params }: HttpContext) {
    const node = await Node.firstOrFail(params.id)

    const response = {
      debug: false,
      uuid: node.uuid,
      token_id: node.daemonTokenId,
      token: node.daemonToken,
      api: {
        host: '0.0.0.0',
        port: node.daemonListen,
        ssl: {
          enabled: node.scheme === 'https',
          cert: `/etc/letsencrypt/live/${node.fqdn}/fullchain.pem`,
          key: `/etc/letsencrypt/live/${node.fqdn}/privkey.pem`,
        },
        upload_limit: node.uploadSize,
      },
      system: {
        data: node.daemonBase,
        sftp: {
          bind_port: node.daemonSftp,
        },
      },
      allowed_mounts: [],
      remote: 'https://cdn.pterodactyl.io',
    }

    return response
  }
}
