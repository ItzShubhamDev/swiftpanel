import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Egg from './egg.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import ServerVariable from './server_variable.js'

export default class EggVariable extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare defaultValue: string

  @column()
  declare description: string

  @column()
  declare eggId: number

  @column()
  declare envVariable: string

  @column()
  declare name: string

  @column()
  declare rules: string | null

  @column()
  declare userEditable: boolean

  @column()
  declare userViewable: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Egg)
  declare egg: BelongsTo<typeof Egg>

  @hasMany(() => ServerVariable, { foreignKey: 'variableId' })
  declare serverVariables: HasMany<typeof ServerVariable>
}
