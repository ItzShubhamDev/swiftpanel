import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class ActivityLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare actorId: number | null

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

  @column()
  declare subjectId: number

  @column()
  declare subjectType: string

  @column.dateTime({ autoCreate: true })
  declare timestamp: DateTime
}
