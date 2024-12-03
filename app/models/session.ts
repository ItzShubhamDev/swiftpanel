import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare ipAddress: string | null

  @column()
  declare lastActivity: number

  @column()
  declare payload: string

  @column()
  declare userAgent: string | null

  @column()
  declare userId: number | null
}
