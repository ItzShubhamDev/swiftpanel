import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Server from './server.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class AuditLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare action: string

  @column()
  declare device: string

  @column({
    consume: (value: number) => !!value,
  })
  declare isSystem: boolean

  @column()
  declare metadata: string

  @column()
  declare serverId: number | null

  @column()
  declare subaction: string | null

  @column()
  declare userId: number | null

  @column()
  declare uuid: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare createdAt: DateTime | null

  @belongsTo(() => Server)
  declare server: BelongsTo<typeof Server>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
