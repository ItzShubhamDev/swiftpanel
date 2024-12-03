import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Server from './server.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import EggVariable from './egg_variable.js'

export default class ServerVariable extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare serverId: number | null

  @column()
  declare variableId: number

  @column()
  declare variableValue: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Server)
  declare server: BelongsTo<typeof Server>

  @belongsTo(() => EggVariable, { foreignKey: 'variableId' })
  declare variable: BelongsTo<typeof EggVariable>
}
