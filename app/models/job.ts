import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare attempts: number

  @column()
  declare availableAt: number

  @column()
  declare createdAt: number

  @column()
  declare payload: string

  @column()
  declare queue: string

  @column()
  declare reservedAt: number | null
}
