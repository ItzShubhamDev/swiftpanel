import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'server_transfers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('server_id')
        .unsigned()
        .notNullable()
        .references('servers.id')
        .onDelete('CASCADE')
      table.boolean('successful')
      table.integer('old_node').unsigned().notNullable()
      table.integer('new_node').unsigned().notNullable()
      table.integer('old_allocation').unsigned().notNullable()
      table.integer('new_allocation').unsigned().notNullable()
      table.json('old_additional_allocations')
      table.json('new_additional_allocations')
      table.boolean('archived').notNullable().defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
