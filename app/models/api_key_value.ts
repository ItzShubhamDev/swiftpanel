import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ApiKey from './api_key.js'

export default class ApiKeyValue extends BaseModel {
  @column()
  declare apiKeyId: number

  @column()
  declare key: string

  @belongsTo(() => ApiKey)
  declare apiKey: BelongsTo<typeof ApiKey>
}
