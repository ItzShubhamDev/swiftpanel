import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class FailedJob extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare connection: string

  @column()
  declare exception: string

  @column()
  declare payload: string

  @column()
  declare queue: string

  @column()
  declare uuid: string | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare failedAt: DateTime
}
