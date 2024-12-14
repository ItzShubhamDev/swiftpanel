import { BaseModel, column, hasMany, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Allocation from './allocation.js'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import AuditLog from './audit_log.js'
import Backup from './backup.js'
import Schedule from './schedule.js'
import ServerTransfer from './server_transfer.js'
import ServerVariable from './server_variable.js'
import Egg from './egg.js'
import Nest from './nest.js'
import Node from './node.js'
import User from './user.js'
import Subuser from './subuser.js'
import { randomUUID } from 'node:crypto'
import Database from './database.js'

export default class Server extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare allocationId: number

  @column()
  declare allocationLimit: number | null

  @column()
  declare backupLimit: number

  @column()
  declare cpu: number

  @column()
  declare databaseLimit: number | null

  @column()
  declare description: string

  @column()
  declare disk: number

  @column()
  declare eggId: number

  @column()
  declare externalId: string | null

  @column()
  declare image: string

  @column()
  declare io: number

  @column()
  declare memory: number

  @column()
  declare name: string

  @column()
  declare nestId: number

  @column()
  declare nodeId: number

  @column({
    consume: (value: number) => !!value,
  })
  declare oomDisabled: boolean

  @column()
  declare ownerId: number

  @column({
    consume: (value: number) => !!value,
  })
  declare skipScripts: boolean

  @column()
  declare startup: string

  @column()
  declare status: string | null

  @column()
  declare swap: number

  @column()
  declare threads: string | null

  @column()
  declare uuid: string

  @column()
  declare uuidShort: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare installedAt: DateTime | null

  @beforeCreate()
  static assignDaemonToken(server: Server) {
    const uuid = randomUUID()
    server.uuid = uuid
    server.uuidShort = uuid.substring(0, 8)
  }

  @hasMany(() => Allocation)
  declare allocations: HasMany<typeof Allocation>

  @hasMany(() => AuditLog)
  declare auditLogs: HasMany<typeof AuditLog>

  @hasMany(() => Backup)
  declare backups: HasMany<typeof Backup>

  @hasMany(() => Database)
  declare databases: HasMany<typeof Database>

  @hasMany(() => Schedule)
  declare schedules: HasMany<typeof Schedule>

  @hasMany(() => ServerTransfer)
  declare serverTransfers: HasMany<typeof ServerTransfer>

  @hasMany(() => ServerVariable)
  declare serverVariables: HasMany<typeof ServerVariable>

  @hasMany(() => Subuser)
  declare subusers: HasMany<typeof Subuser>

  @belongsTo(() => Egg)
  declare egg: BelongsTo<typeof Egg>

  @belongsTo(() => Nest)
  declare nest: BelongsTo<typeof Nest>

  @belongsTo(() => Node)
  declare node: BelongsTo<typeof Node>

  @belongsTo(() => User, { foreignKey: 'ownerId' })
  declare owner: BelongsTo<typeof User>
}
