import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Server from './server.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Allocation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ip: string

  @column()
  declare ipAlias: string | null

  @column()
  declare nodeId: number

  @column()
  declare notes: string | null

  @column()
  declare port: number

  @column()
  declare serverId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Server)
  declare server: BelongsTo<typeof Server>
}
