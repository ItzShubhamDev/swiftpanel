import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class ApiLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare authorized: boolean

  @column()
  declare content: string | null

  @column()
  declare error: string | null

  @column()
  declare key: string | null

  @column()
  declare method: string

  @column()
  declare requestIp: string

  @column()
  declare route: string

  @column()
  declare userAgent: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
