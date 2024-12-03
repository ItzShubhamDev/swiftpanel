import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'activity_logs_subjects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('activity_log_id')
        .unsigned()
        .notNullable()
        .references('activity_logs.id')
        .onDelete('CASCADE')
      table.string('subject_type').notNullable()
      table.integer('subject_id').unsigned().notNullable()

      table.index(['subject_type', 'subject_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
