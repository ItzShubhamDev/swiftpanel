import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Migration extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare batch: number

  @column()
  declare migration: string
}
