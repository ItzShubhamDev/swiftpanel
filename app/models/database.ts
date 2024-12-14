import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Server from './server.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import DatabasesHost from './databases_host.js'

export default class Database extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare serverId: number

  @column()
  declare database: string

  @column()
  declare databaseHostId: number

  @column()
  declare remote: string

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  declare maxConnections: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Server)
  declare server: BelongsTo<typeof Server>

  @belongsTo(() => DatabasesHost)
  declare host: BelongsTo<typeof DatabasesHost>
}
