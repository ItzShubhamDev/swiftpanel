import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Schedule from './schedule.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare action: string

  @column()
  declare continueOnFailure: boolean

  @column()
  declare isQueued: boolean

  @column()
  declare payload: string

  @column()
  declare scheduleId: number

  @column()
  declare sequenceId: number

  @column()
  declare timeOffset: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Schedule)
  declare schedule: BelongsTo<typeof Schedule>
}
