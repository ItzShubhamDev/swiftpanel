import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import ApiKeyValue from './api_key_value.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class ApiKey extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare type: string

  @column()
  declare abilities: string

  @column()
  declare name: string

  @column()
  declare createdAt: DateTime

  @column()
  declare updatedAt: DateTime

  @column()
  declare lastUsedAt: DateTime

  @column()
  declare expiresAt: DateTime

  @hasMany(() => ApiKeyValue)
  declare apiKeyValue: HasMany<typeof ApiKeyValue>
}
