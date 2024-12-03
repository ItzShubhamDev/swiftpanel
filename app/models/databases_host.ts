import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Node from './node.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class DatabasesHost extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare host: string

  @column()
  declare maxDatabases: number | null

  @column()
  declare name: string

  @column()
  declare nodeId: number | null

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  declare port: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Node)
  declare node: BelongsTo<typeof Node>
}
