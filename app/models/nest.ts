import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Egg from './egg.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Server from './server.js'

export default class Nest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare author: string

  @column()
  declare description: string | null

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Egg)
  declare eggs: HasMany<typeof Egg>

  @hasMany(() => Server)
  declare servers: HasMany<typeof Server>
}
