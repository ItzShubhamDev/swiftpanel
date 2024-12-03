import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'databases_hosts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('host').notNullable()
      table.integer('port').unsigned().notNullable()
      table.string('username').notNullable()
      table.text('password').notNullable()
      table.integer('max_databases').unsigned()
      table.integer('node_id').unsigned().references('nodes.id').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
