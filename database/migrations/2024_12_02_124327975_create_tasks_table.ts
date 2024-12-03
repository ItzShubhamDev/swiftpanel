import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('schedule_id')
        .unsigned()
        .notNullable()
        .references('schedules.id')
        .onDelete('CASCADE')
      table.integer('sequence_id').unsigned().notNullable()
      table.string('action').notNullable()
      table.text('payload').notNullable()
      table.integer('time_offset').unsigned().notNullable()
      table.boolean('is_queued').notNullable()
      table.boolean('continue_on_failure').notNullable().defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.index(['schedule_id', 'sequence_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
