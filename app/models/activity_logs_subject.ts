import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import ActivityLog from './activity_log.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ActivityLogsSubject extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare activityLogId: number

  @column()
  declare subjectId: number

  @column()
  declare subjectType: string

  @belongsTo(() => ActivityLog)
  declare activityLog: BelongsTo<typeof ActivityLog>
}
