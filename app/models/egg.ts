import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import EggVariable from './egg_variable.js'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Nest from './nest.js'
import Server from './server.js'

export default class Egg extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare author: string

  @column()
  declare configFiles: string | null

  @column()
  declare configFrom: number | null

  @column()
  declare configLogs: string | null

  @column()
  declare configStartup: string | null

  @column()
  declare configStop: string | null

  @column()
  declare copyScriptFrom: number | null

  @column()
  declare description: string | null

  @column()
  declare dockerImages: string | null

  @column()
  declare features: string | null

  @column()
  declare fileDenylist: string | null

  @column()
  declare forceOutgoingIp: boolean

  @column()
  declare name: string

  @column()
  declare nestId: number

  @column()
  declare scriptContainer: string

  @column()
  declare scriptEntry: string

  @column()
  declare scriptInstall: string | null

  @column()
  declare scriptIsPrivileged: boolean

  @column()
  declare startup: string | null

  @column()
  declare updateUrl: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => EggVariable)
  declare eggVariables: HasMany<typeof EggVariable>

  @belongsTo(() => Nest)
  declare nest: BelongsTo<typeof Nest>

  @hasMany(() => Server)
  declare servers: HasMany<typeof Server>
}
