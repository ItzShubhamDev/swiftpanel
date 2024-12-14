import UserSshKey from '#models/user_ssh_key'
import { sshKeyDeleteValidator, sshKeyValidator } from '#validators/api/client/ssh_key'
import { HttpContext } from '@adonisjs/core/http'

export default class SshKeysController {
  async index() {
    const sshKeys = await UserSshKey.query().where('userId', 1).orderBy('createdAt', 'desc')

    const response = {
      object: 'list',
      data: sshKeys.map((sshKey) => ({
        object: 'ssh_key',
        attributes: {
          name: sshKey.name,
          fingerprint: sshKey.fingerprint,
          public_key: sshKey.publicKey,
          created_at: sshKey.createdAt,
        },
      })),
    }

    return response
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(sshKeyValidator)

    const sshKey = await UserSshKey.create({
      name: payload.name,
      publicKey: payload.public_key,
      userId: 1,
    })

    const response = {
      object: 'ssh_key',
      attributes: {
        name: sshKey.name,
        fingerprint: sshKey.fingerprint,
        public_key: sshKey.publicKey,
        created_at: sshKey.createdAt,
      },
    }

    return response
  }

  async destroy({ request, response }: HttpContext) {
    const { fingerprint } = await request.validateUsing(sshKeyDeleteValidator)

    const key = await UserSshKey.query()
      .where('fingerprint', fingerprint)
      .andWhere('userId', 1)
      .firstOrFail()

    await key.delete()

    response.noContent()
  }
}
