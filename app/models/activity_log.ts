import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import ActivityLogsSubject from './activity_logs_subject.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class ActivityLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare actorId: string | null

  @column()
  declare actorType: string | null

  @column()
  declare apiKeyId: number | null

  @column()
  declare batch: string | null

  @column()
  declare description: string | null

  @column()
  declare event: string

  @column()
  declare ip: string

  @column()
  declare properties: string

  @column.dateTime({ autoCreate: true })
  declare timestamp: DateTime

  @hasMany(() => ActivityLogsSubject)
  declare activityLogsSubjects: HasMany<typeof ActivityLogsSubject>
}
