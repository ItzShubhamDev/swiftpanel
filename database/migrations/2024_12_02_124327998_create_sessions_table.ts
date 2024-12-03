import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sessions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().unique()
      table.integer('user_id').unsigned()
      table.string('ip_address', 45)
      table.text('user_agent')
      table.text('payload').notNullable()
      table.integer('last_activity').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
