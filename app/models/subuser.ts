import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Server from './server.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Subuser extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare permissions: string | null

  @column()
  declare serverId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Server)
  declare server: BelongsTo<typeof Server>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
