import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import AuditLog from './audit_log.js'
import RecoveryToken from './recovery_token.js'
import Server from './server.js'
import Subuser from './subuser.js'
import UserSshKey from './user_ssh_key.js'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { randomUUID } from 'node:crypto'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email', 'username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare externalId: string | null

  @column()
  declare gravatar: number

  @column()
  declare language: string

  @column()
  declare nameFirst: string | null

  @column()
  declare nameLast: string | null

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare rememberToken: string | null

  @column({
    consume: (value: number) => !!value,
  })
  declare rootAdmin: boolean

  @column()
  declare totpSecret: string | null

  @column({
    consume: (value: number) => !!value,
  })
  declare useTotp: boolean

  @column()
  declare username: string

  @column()
  declare uuid: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare totpAuthenticatedAt: DateTime | null

  @hasMany(() => AuditLog, { foreignKey: 'userId' })
  declare auditLogs: HasMany<typeof AuditLog>

  @hasMany(() => RecoveryToken, { foreignKey: 'userId' })
  declare recoveryTokens: HasMany<typeof RecoveryToken>

  @hasMany(() => Server, { foreignKey: 'ownerId' })
  declare servers: HasMany<typeof Server>

  @hasMany(() => Subuser, { foreignKey: 'userId' })
  declare subusers: HasMany<typeof Subuser>

  @hasMany(() => UserSshKey, { foreignKey: 'userId' })
  declare userSshKeys: HasMany<typeof UserSshKey>

  @beforeCreate()
  static assignUuid(user: User) {
    user.uuid = randomUUID()
  }

  static apiKeys = DbAccessTokensProvider.forModel(User, {
    prefix: 'swt_',
    table: 'api_keys',
    type: 'api',
  })
}
