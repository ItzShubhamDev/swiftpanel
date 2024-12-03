import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class DatabaseHost extends BaseModel {
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
}
