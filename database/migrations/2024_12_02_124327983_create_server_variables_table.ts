import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'server_variables'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('server_id').unsigned().references('servers.id').onDelete('CASCADE')
      table
        .integer('variable_id')
        .unsigned()
        .notNullable()
        .references('egg_variables.id')
        .onDelete('CASCADE')
      table.text('variable_value').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
