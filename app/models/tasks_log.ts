import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class TasksLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare response: string

  @column()
  declare runStatus: number

  @column()
  declare taskId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime()
  declare updatedAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare runTime: DateTime
}
