import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'schedules'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('server_id')
        .unsigned()
        .notNullable()
        .references('servers.id')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('cron_day_of_week').notNullable()
      table.string('cron_month').notNullable()
      table.string('cron_day_of_month').notNullable()
      table.string('cron_hour').notNullable()
      table.string('cron_minute').notNullable()
      table.boolean('is_active').notNullable()
      table.boolean('is_processing').notNullable()
      table.boolean('only_when_online').notNullable().defaultTo(false)
      table.timestamp('last_run_at')
      table.timestamp('next_run_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
