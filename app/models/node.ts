import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import DatabasesHost from './databases_host.js'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Location from './location.js'
import Server from './server.js'

export default class Node extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare behindProxy: boolean

  @column()
  declare daemonToken: string

  @column()
  declare daemonTokenId: string

  @column()
  declare daemonBase: string

  @column()
  declare daemonListen: number

  @column()
  declare daemonSftp: number

  @column()
  declare description: string | null

  @column()
  declare disk: number

  @column()
  declare diskOverallocate: number

  @column()
  declare fqdn: string

  @column()
  declare locationId: number

  @column()
  declare maintenanceMode: boolean

  @column()
  declare memory: number

  @column()
  declare memoryOverallocate: number

  @column()
  declare name: string

  @column()
  declare public: boolean

  @column()
  declare scheme: string

  @column()
  declare uploadSize: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => DatabasesHost)
  declare databasesHosts: HasMany<typeof DatabasesHost>

  @belongsTo(() => Location)
  declare location: BelongsTo<typeof Location>

  @hasMany(() => Server)
  declare servers: HasMany<typeof Server>
}
