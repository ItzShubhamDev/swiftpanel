import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class PasswordReset extends BaseModel {
  @column()
  declare email: string

  @column()
  declare token: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare createdAt: DateTime
}
