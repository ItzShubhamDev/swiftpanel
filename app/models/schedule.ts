import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Server from './server.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Task from './task.js'

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cronDayOfMonth: string

  @column()
  declare cronDayOfWeek: string

  @column()
  declare cronHour: string

  @column()
  declare cronMinute: string

  @column()
  declare cronMonth: string

  @column({
    consume: (value: number) => !!value,
  })
  declare isActive: boolean

  @column({
    consume: (value: number) => !!value,
  })
  declare isProcessing: boolean

  @column()
  declare name: string

  @column({
    consume: (value: number) => !!value,
  })
  declare onlyWhenOnline: boolean

  @column()
  declare serverId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare lastRunAt: DateTime | null

  @column.dateTime()
  declare nextRunAt: DateTime | null

  @belongsTo(() => Server)
  declare server: BelongsTo<typeof Server>

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>
}
