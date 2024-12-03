import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Server from './server.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ServerTransfer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare archived: boolean

  @column()
  declare newAdditionalAllocations: Record<string, any> | null

  @column()
  declare newAllocation: number

  @column()
  declare newNode: number

  @column()
  declare oldAdditionalAllocations: Record<string, any> | null

  @column()
  declare oldAllocation: number

  @column()
  declare oldNode: number

  @column()
  declare serverId: number

  @column()
  declare successful: boolean | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Server)
  declare server: BelongsTo<typeof Server>
}
