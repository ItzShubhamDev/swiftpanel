import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Server from './server.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Backup extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare bytes: number

  @column()
  declare checksum: string | null

  @column()
  declare disk: string

  @column()
  declare ignoredFiles: string

  @column({
    consume: (value: number) => !!value,
  })
  declare isLocked: boolean

  @column({
    consume: (value: number) => !!value,
  })
  declare isSuccessful: boolean

  @column()
  declare name: string

  @column()
  declare serverId: number

  @column()
  declare uploadId: string | null

  @column()
  declare uuid: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare completedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null

  @beforeCreate()
  static assignUuid(backup: Backup) {
    backup.uuid = randomUUID()
  }

  @belongsTo(() => Server)
  declare server: BelongsTo<typeof Server>
}
