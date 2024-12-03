import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './users.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class UserSshKey extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fingerprint: string

  @column()
  declare name: string

  @column()
  declare publicKey: string

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
