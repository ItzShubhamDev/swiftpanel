import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'audit_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid').notNullable()
      table.boolean('is_system').notNullable().defaultTo(false)
      table.integer('user_id').unsigned().references('users.id').onDelete('SET NULL')
      table.integer('server_id').unsigned().references('servers.id').onDelete('CASCADE')
      table.string('action').notNullable()
      table.string('subaction')
      table.text('device', 'longtext').notNullable()
      table.text('metadata', 'longtext').notNullable()
      table.timestamp('created_at').defaultTo(this.now())

      table.index(['action', 'server_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
