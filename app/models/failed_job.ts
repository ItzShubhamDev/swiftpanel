import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

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

  @beforeCreate()
  static assignUuid(job: FailedJob) {
    job.uuid = randomUUID()
  }

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare failedAt: DateTime
}
